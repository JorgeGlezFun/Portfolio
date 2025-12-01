# ----------------------------------------------------
# ETAPA 1: BUILDER (Compilación y dependencias)
# ----------------------------------------------------
FROM php:8.2-fpm AS builder

# 1️⃣ Instalar dependencias del sistema y herramientas de compilación
# Incluimos todas las dependencias identificadas (libxml2-dev, libzip-dev, libonig-dev)
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

# 2️⃣ INSTALACIÓN ATÓMICA DE EXTENSIONES (¡DEPURACIÓN CLAVE!)
# Instalamos cada extensión por separado. El proceso fallará en la primera que encuentre problemas.
RUN docker-php-ext-install pdo
RUN docker-php-ext-install tokenizer
RUN docker-php-ext-install xml
RUN docker-php-ext-install ctype
RUN docker-php-ext-install bcmath
RUN docker-php-ext-install mbstring
RUN docker-php-ext-install zip

# 3️⃣ Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
# ... (El resto de la configuración de Node/Vite y Producción sigue igual)
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
WORKDIR /var/www/html
COPY --from=builder /app /var/www/html
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage \
    && chmod -R 775 /var/www/html/bootstrap/cache
RUN php artisan key:generate --force
RUN php artisan migrate --force
EXPOSE 10000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]
