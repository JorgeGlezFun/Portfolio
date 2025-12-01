# 1️⃣ IMAGEN BASE
FROM php:8.2-fpm

# 2️⃣ INSTALAR DEPENDENCIAS DEL SISTEMA
# Instala las dependencias necesarias, incluyendo las que necesita docker-php-ext-install.
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    libonig-dev \
    unzip \
    git \
    curl \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

# 3️⃣ INSTALAR EXTENSIONES DE PHP
# Este comando ahora tiene las dependencias -dev disponibles en la capa anterior.
RUN docker-php-ext-install pdo pdo_pgsql mbstring tokenizer xml ctype bcmath zip

# 4️⃣ INSTALAR COMPOSER
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 5️⃣ INSTALAR NODE.JS (Versión 20.x)
# Se hace el segundo apt-get update para la nueva fuente de paquetes de Node.js.
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
RUN php artisan migrate --force

# 11️⃣ PUERTO Y COMANDO DE INICIO
EXPOSE 10000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]
