# ----------------------------------------------------
# ETAPA 1: BUILDER (Compilación y dependencias)
# ----------------------------------------------------
FROM php:8.2-fpm AS builder

# 1️⃣ Instalar dependencias del sistema y herramientas de compilación
# Hemos quitado libonig-dev. Mantenemos las dependencias de zip.
RUN apt-get update && apt-get install -y \
    libzip-dev \
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

# 2️⃣ Instalar extensiones de PHP (¡Solo las que son necesarias y menos problemáticas!)
# Quitamos pdo_pgsql. Quitaremos 'zip' y 'mbstring' si este paso falla.
RUN docker-php-ext-install pdo tokenizer xml ctype bcmath

# 2️⃣b: Instalación de extensiones problemáticas (Aisladas)
# Intentamos instalar zip y mbstring de forma aislada
RUN docker-php-ext-install zip
# RUN docker-php-ext-install mbstring # Dejamos mbstring fuera por ahora.

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
# ETAPA 2: PRODUCCIÓN (Imagen final)
# ----------------------------------------------------
FROM php:8.2-fpm AS production
# ... (El resto de la imagen de producción sigue igual)
WORKDIR /var/www/html
COPY --from=builder /app /var/www/html
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage \
    && chmod -R 775 /var/www/html/bootstrap/cache
RUN php artisan key:generate --force
# (Aquí debes decidir si las migraciones deben ir en el build o en el start script)
# RUN php artisan migrate --force
EXPOSE 10000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]
