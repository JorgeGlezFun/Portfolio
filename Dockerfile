# 1️⃣ IMAGEN BASE
FROM php:8.2-fpm

# 2️⃣ INSTALAR DEPENDENCIAS DEL SISTEMA
# Instala las dependencias necesarias.
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
RUN docker-php-ext-install pdo pdo_pgsql mbstring tokenizer xml ctype bcmath zip

# 4️⃣ INSTALAR COMPOSER
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 5️⃣ INSTALAR NODE.JS (Versión 20.x)
# Se debe hacer un nuevo apt-get update después de agregar la nueva fuente de Node.js.
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get update \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# 6️⃣ PREPARAR DIRECTORIO
WORKDIR /var/www/html

# 7️⃣ COPIAR ARCHIVOS DEL PROYECTO
# Copiar primero composer.json/package.json para optimizar el caching de la capa de dependencias.
COPY composer.json composer.lock ./
COPY package.json package-lock.json ./

# 8️⃣ INSTALAR DEPENDENCIAS Y BUILD
# Instalar PHP y JS.
RUN composer install --no-dev --optimize-autoloader
RUN npm install && npm run build

# 9️⃣ COPIAR EL RESTO DEL CÓDIGO
COPY . .

# 10️⃣ CONFIGURACIÓN DE LARAVEL (Ejecutar solo en el build para no hacerlo en cada arranque)
# Asegúrate de que el .env es copiado o se usan variables de entorno de Render.
# Las migraciones y key:generate se hacen aquí, pero Render podría requerir que se hagan
# con un script de inicio o un comando separado si la DB no está disponible aún.
# Para Render, a menudo se prefiere un script que ejecute estas cosas en el arranque.
RUN php artisan key:generate --force
# Por ahora, mantendremos las migraciones en el build.
RUN php artisan migrate --force

# 11️⃣ PUERTO Y COMANDO DE INICIO
EXPOSE 10000

# Usar la forma recomendada de CMD para que se comporte como un comando ejecutable.
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]
