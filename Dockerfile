# 1️⃣ IMAGEN BASE
FROM php:8.2-fpm

# 2️⃣ INSTALAR DEPENDENCIAS DEL SISTEMA Y HERRAMIENTAS DE BUILD
# Incluimos los paquetes de build-esenciales y limpiamos la caché en la misma capa.
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    libonig-dev \
    unzip \
    git \
    curl \
    gnupg \
    # AGREGADO: Herramientas esenciales para la compilación de extensiones de PHP
    autoconf \
    build-essential \
    libssl-dev \
    zlib1g-dev \
    # Fin de AGREGADO
    && rm -rf /var/lib/apt/lists/*

# 3️⃣ INSTALAR EXTENSIONES DE PHP
# Ahora, con las herramientas de compilación instaladas, este paso debería funcionar.
RUN docker-php-ext-install pdo pdo_pgsql mbstring tokenizer xml ctype bcmath zip

# 4️⃣ INSTALAR COMPOSER
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 5️⃣ INSTALAR NODE.JS (Versión 20.x)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get update \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# 6️⃣ PREPARAR DIRECTORIO
WORKDIR /var/www/html

# 7️⃣ COPIAR ARCHIVOS DE DEPENDENCIAS (para caching)
COPY composer.json composer.lock ./
COPY package.json package-lock.json ./

# 8️⃣ INSTALAR DEPENDENCIAS Y BUILD
RUN composer install --no-dev --optimize-autoloader
RUN npm install && npm run build

# 9️⃣ COPIAR EL RESTO DEL CÓDIGO
COPY . .

# 10️⃣ CONFIGURACIÓN DE LARAVEL
RUN php artisan key:generate --force
# Nota: Si las migraciones fallan aquí por no tener conexión a la DB,
# tendrás que mover este comando a un script de inicio o a los comandos de Render.
RUN php artisan migrate --force

# 11️⃣ PUERTO Y COMANDO DE INICIO
EXPOSE 10000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]
