# 1️⃣ Imagen base PHP con FPM
FROM php:8.2-fpm

# 2️⃣ Instalar dependencias del sistema y extensiones de PHP necesarias
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    libonig-dev \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo pdo_pgsql mbstring tokenizer xml ctype bcmath zip \
    && rm -rf /var/lib/apt/lists/*

# 3️⃣ Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 4️⃣ Instalar Node.js y npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# 5️⃣ Crear directorio de la app
WORKDIR /var/www/html

# 6️⃣ Copiar archivos del proyecto
COPY . .

# 7️⃣ Instalar dependencias PHP y JS, y build de React/Vite
RUN composer install --no-dev --optimize-autoloader
RUN if [ -f package.json ]; then npm install && npm run build; fi

# 8️⃣ Generar APP_KEY de Laravel
RUN php artisan key:generate --force

# 9️⃣ Ejecutar migraciones
RUN php artisan migrate --force

# 10️⃣ Exponer el puerto que Render usará
EXPOSE 10000

# 11️⃣ Comando por defecto
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]
