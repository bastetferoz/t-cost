#!/bin/bash
set -e

echo "🚀 Instalando InstaCost..."
echo ""

# ─── Dependencias PHP ───────────────────────────────────────────────
echo "📦 Instalando dependencias de Composer..."
composer install

# ─── Dependencias JS ────────────────────────────────────────────────
echo "📦 Instalando dependencias de Node..."
npm install

# ─── Configuración .env ─────────────────────────────────────────────
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Archivo .env creado desde .env.example"
else
    echo "ℹ️  Ya existe un archivo .env, se mantiene el actual."
fi

php artisan key:generate --force
echo ""

# ─── Configuración de Base de Datos (interactiva) ───────────────────
echo "⚙️  Configuración de base de datos"
echo "─────────────────────────────────"

read -p "Motor de BD [mysql]: " DB_CONNECTION
DB_CONNECTION=${DB_CONNECTION:-mysql}

read -p "Host [127.0.0.1]: " DB_HOST
DB_HOST=${DB_HOST:-127.0.0.1}

read -p "Puerto [3306]: " DB_PORT
DB_PORT=${DB_PORT:-3306}

read -p "Nombre de la base de datos [t_cost]: " DB_DATABASE
DB_DATABASE=${DB_DATABASE:-t_cost}

read -p "Usuario de BD [t_cost]: " DB_USERNAME
DB_USERNAME=${DB_USERNAME:-t_cost}

read -sp "Contraseña de BD: " DB_PASSWORD
echo ""

# Escribir en .env
sed -i "s/^DB_CONNECTION=.*/DB_CONNECTION=${DB_CONNECTION}/" .env
sed -i "s/^DB_HOST=.*/DB_HOST=${DB_HOST}/" .env
sed -i "s/^DB_PORT=.*/DB_PORT=${DB_PORT}/" .env
sed -i "s/^DB_DATABASE=.*/DB_DATABASE=${DB_DATABASE}/" .env
sed -i "s/^DB_USERNAME=.*/DB_USERNAME=${DB_USERNAME}/" .env
sed -i "s/^DB_PASSWORD=.*/DB_PASSWORD=${DB_PASSWORD}/" .env

echo ""
echo "✅ Datos de BD guardados en .env"
echo ""

# ─── Crear la base de datos si no existe ────────────────────────────
echo "🗄️  Verificando base de datos..."
if command -v mysql &> /dev/null; then
    echo "Intentando crear la base de datos '${DB_DATABASE}' (si no existe)..."
    mysql -u "${DB_USERNAME}" -p"${DB_PASSWORD}" -h "${DB_HOST}" -P "${DB_PORT}" \
        -e "CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>/dev/null \
        && echo "✅ Base de datos lista." \
        || echo "⚠️  No se pudo crear la BD automáticamente. Asegurate de que exista antes de continuar."
else
    echo "⚠️  mysql CLI no encontrado. Asegurate de que la base '${DB_DATABASE}' exista antes de continuar."
fi
echo ""

# ─── Migraciones ────────────────────────────────────────────────────
echo "🗃️  Corriendo migraciones..."
php artisan migrate --force

# ─── Assets ─────────────────────────────────────────────────────────
echo "🎨 Compilando assets..."
npm run build

# ─── Storage link ───────────────────────────────────────────────────
php artisan storage:link 2>/dev/null || true

# ─── Permisos ───────────────────────────────────────────────────────
echo "🔒 Ajustando permisos..."
chmod -R 775 storage bootstrap/cache

# ─── Limpiar cache ──────────────────────────────────────────────────
php artisan optimize:clear

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  ✅ InstaCost instalado correctamente."
echo ""
echo "  Arrancá el servidor con:"
echo "    php artisan serve"
echo ""
echo "  Después abrí http://localhost:8000 y registrá"
echo "  tu primera cuenta."
echo "═══════════════════════════════════════════════════════"
