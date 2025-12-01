# ----------------------------------------------------
# ETAPA 1: BUILDER (Compilación y dependencias)
# ----------------------------------------------------
FROM php:8.2-fpm AS builder

# 1️⃣ Instalar dependencias del sistema y herramientas de compilación
# Usaremos build-essential y las libs para compilar extensiones.
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    libonig-dev \
    unzip \
    git \
    curl \
    gnupg \
    autoconf \
    build-essential \
    libssl-dev \
    zlib1g-dev \
    # Limpieza de caché
    && rm -rf /var/lib/apt/lists/*

# 2️⃣ Instalar extensiones de PHP (¡Separado para depurar!)
# Lo separamos del RUN anterior para que el log te diga exactamente qué extensión falla.
RUN docker-php-ext-install pdo pdo_pgsql mbstring tokenizer xml ctype bcmath zip

# 3️⃣ Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 4️⃣ Instalar Node.js y NPM
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get update \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# 5️⃣ Copiar archivos del proyecto
WORKDIR /app
COPY . .

# 6️⃣ Instalar dependencias PHP y JS, y build de React/Vite
RUN composer install --no-dev --optimize-autoloader
RUN npm install && npm run build

# ----------------------------------------------------
# ETAPA 2: PRODUCCIÓN (Imagen final, limpia y ligera)
# ----------------------------------------------------
FROM php:8.2-fpm AS production

# 1️⃣ Copiar los archivos de la etapa builder (incluyendo /vendor y /public/build)
WORKDIR /var/www/html
COPY --from=builder /app /var/www/html

# 2️⃣ Crear directorios de Laravel y configurar permisos
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage \
    && chmod -R 775 /var/www/html/bootstrap/cache

# 3️⃣ Configuración de Laravel
# Nota: Si php artisan migrate falla por la DB, deberás moverlo a un script de inicio
RUN php artisan key:generate --force
RUN php artisan migrate --force

# 4️⃣ Puerto y comando de inicio
EXPOSE 10000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]
