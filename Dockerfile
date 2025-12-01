# ----------------------------------------------------
# ETAPA 1: BUILDER (Compilación y dependencias)
# ----------------------------------------------------
FROM php:8.2-fpm AS builder

# 1️⃣ Instalar dependencias del sistema y herramientas de compilación
# Incluimos librerías para XML, Zip y Mbstring.
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

# 2️⃣ Instalar extensiones de PHP (Sólo las requeridas que necesitan compilación manual)
# Mantienen pdo, ya que es la base. Quitamos las conflictivas y preinstaladas.
RUN docker-php-ext-install pdo bcmath xml mbstring zip

# 3️⃣ Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 4️⃣ Instalar Node.js y NPM
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get update \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# 5️⃣ PREPARAR DIRECTORIO Y COPIAR ARCHIVOS DE DEPENDENCIAS
WORKDIR /app
# 💡 Importante: Copiar solo los archivos de dependencias primero para optimizar el caché.
COPY composer.json composer.lock ./
COPY package.json package-lock.json ./

# 6️⃣ INSTALAR DEPENDENCIAS PHP Y BUILD
# Dividimos Composer en dos pasos para evitar desbordamiento de memoria
RUN composer install --no-dev
RUN composer dump-autoload --optimize

# 7️⃣ BUILD DE VITE/REACT
RUN npm install
RUN npm run build

# 8️⃣ COPIAR EL RESTO DEL CÓDIGO
COPY . .

# ----------------------------------------------------
# ETAPA 2: PRODUCCIÓN (Imagen final, limpia y ligera)
# ----------------------------------------------------
FROM php:8.2-fpm AS production

# 1️⃣ Copiar el contenido final de la etapa builder
WORKDIR /var/www/html
COPY --from=builder /app /var/www/html

# 2️⃣ Configurar permisos de Laravel
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage \
    && chmod -R 775 /var/www/html/bootstrap/cache

# 3️⃣ Configuración de Laravel
# Nota: Si las migraciones fallan por la DB (DB no accesible), este paso debe ir en un script de inicio.
RUN php artisan key:generate --force
RUN php artisan migrate --force

# 4️⃣ Puerto y comando de inicio
EXPOSE 10000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]
