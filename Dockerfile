# 1️⃣ IMAGEN BASE
FROM php:8.2-fpm

# 2️⃣ INSTALAR DEPENDENCIAS, EXTENSIONES DE PHP Y LIMPIEZA
# Combinamos todo en una sola capa RUN para garantizar que las dependencias estén disponibles
# y luego eliminamos las herramientas de compilación para reducir el tamaño final de la imagen.
RUN apt-get update && apt-get install -y \
    # Dependencias del sistema
    libpq-dev \
    libzip-dev \
    libonig-dev \
    unzip \
    git \
    curl \
    gnupg \
    # Herramientas de compilación ESENCIALES
    autoconf \
    build-essential \
    libssl-dev \
    zlib1g-dev \
    # Fin de dependencias
    \
    # INSTALAR EXTENSIONES
    && docker-php-ext-install pdo pdo_pgsql mbstring tokenizer xml ctype bcmath zip \
    \
    # LIMPIEZA: Eliminar herramientas de compilación y caché
    && apt-get purge -y autoconf build-essential libssl-dev zlib1g-dev \
    && apt-get autoremove -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 3️⃣ INSTALAR COMPOSER
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 4️⃣ INSTALAR NODE.JS (Versión 20.x)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get update \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# 5️⃣ PREPARAR DIRECTORIO
WORKDIR /var/www/html

# 6️⃣ COPIAR ARCHIVOS DE DEPENDENCIAS (para caching)
COPY composer.json composer.lock ./
COPY package.json package-lock.json ./

# 7️⃣ INSTALAR DEPENDENCIAS Y BUILD
RUN composer install --no-dev --optimize-autoloader
RUN npm install && npm run build

# 8️⃣ COPIAR EL RESTO DEL CÓDIGO
COPY . .

# 9️⃣ CONFIGURACIÓN DE LARAVEL (¡CUIDADO! Esto puede fallar si no hay conexión a la DB)
# Si Render no tiene la DB activa en el build, esta línea fallará.
RUN php artisan key:generate --force
RUN php artisan migrate --force

# 10️⃣ PUERTO Y COMANDO DE INICIO
EXPOSE 10000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]
