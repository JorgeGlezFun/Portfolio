# ----------------------------------------------------
# ETAPA 1: BUILDER (Compilación y dependencias)
# ----------------------------------------------------
FROM php:8.2-fpm AS builder

# 1️⃣ Instalar dependencias del sistema y herramientas de compilación
# Hemos quitado PostgreSQL (libpq-dev) y AGREGADO XML (libxml2-dev, libxslt-dev)
RUN apt-get update && apt-get install -y \
    libzip-dev \
    libonig-dev \
    libxml2-dev \
    libxslt-dev \
    unzip \
    git \
    curl \
    gnupg \
    autoconf \
    build-essential \
    libssl-dev \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

# 2️⃣ Instalar extensiones de PHP (¡Incluyendo XML, Zip y Mbstring!)
# NOTA: pdo_pgsql sigue fuera.
RUN docker-php-ext-install pdo mbstring tokenizer xml ctype bcmath zip

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

# 1️⃣ Copiar los archivos de la etapa builder
WORKDIR /var/www/html
COPY --from=builder /app /var/www/html

# 2️⃣ Configurar permisos
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage \
    && chmod -R 775 /var/www/html/bootstrap/cache

# 3️⃣ Configuración de Laravel
RUN php artisan key:generate --force
RUN php artisan migrate --force

# 4️⃣ Puerto y comando de inicio
EXPOSE 10000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]
