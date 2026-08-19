#!/bin/bash
set -e

echo "🔄 Actualizando InstaCost..."
echo ""

# ─── Bajar cambios ──────────────────────────────────────────────────
echo "📥 Descargando últimos cambios..."
git pull

# ─── Permisos (antes de todo, para evitar errores de escritura) ─────
echo "🔒 Ajustando permisos..."
sudo chown -R $(whoami):www-data storage bootstrap/cache 2>/dev/null || true
sudo chmod -R 775 storage bootstrap/cache

# ─── Dependencias PHP ───────────────────────────────────────────────
echo "📦 Actualizando dependencias de Composer..."
composer install --no-dev --optimize-autoloader

# ─── Dependencias JS ────────────────────────────────────────────────
echo "📦 Actualizando dependencias de Node..."
npm install

# ─── Migraciones ────────────────────────────────────────────────────
echo "🗃️  Corriendo migraciones..."
php artisan migrate --force

# ─── Seeds (si hay nuevos) ──────────────────────────────────────────
php artisan db:seed --force 2>/dev/null || true

# ─── Assets ─────────────────────────────────────────────────────────
echo "🎨 Compilando assets..."
npm run build

# ─── Cache de configuración y rutas ─────────────────────────────────
echo "⚡ Optimizando cache..."
php artisan optimize

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  ✅ Actualización completada."
echo "═══════════════════════════════════════════════════════"
