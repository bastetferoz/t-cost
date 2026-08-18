# InstaCost

Aplicación para calcular el costo real de recetas y llevar el control de ventas, merma y cierres de caja.

Stack: **Laravel 13** + **Inertia.js** + **React** + **Tailwind CSS**.

## Estructura

- `app/Http/Controllers` — controladores de cada sección (Ventas, Facturas, Ingredientes, Recetas, Producción, Presupuestos).
- `app/Models` — `Venta`, `Merma`, `Cierre`, `User`.
- `database/migrations` — tablas de `ventas`, `mermas`, `cierres` (además de las de autenticación que trae Laravel/Breeze).
- `resources/js/Layouts/AppLayout.jsx` — layout general con el sidebar oscuro (Inicio, Facturas, Ingredientes, Recetas, Producción, Ventas, Presupuestos, Compartir la app, Mi perfil, Mi cuenta).
- `resources/js/Pages` — una página Inertia/React por sección. `Ventas/Index.jsx` reproduce la pantalla de Ventas (botones de Dictar/Escribir venta, Dictar/Registrar merma, tabs Ventas/Merma/Cierres, estado vacío).

Autenticación (login, registro, recuperar contraseña, verificación de email) viene del stack de Laravel Breeze (Inertia + React), ya scaffoldeado en `routes/auth.php` y `resources/js/Pages/Auth`.

## Requisitos

- PHP 8.3+
- Composer
- Node 18+ y npm

## Instalación

```bash
composer install
cp .env.example .env
php artisan key:generate

# Base de datos SQLite por defecto (database/database.sqlite)
touch database/database.sqlite
php artisan migrate

npm install
npm run build   # o `npm run dev` para desarrollo con recarga en caliente
```

Levantar el servidor:

```bash
php artisan serve
```

Y abrir `http://localhost:8000` — te va a llevar a `/inicio` una vez logueado (creá una cuenta desde `/register`).

## Notas

- Este repo se armó a partir del skeleton oficial de `laravel/laravel` y el scaffolding de `laravel/breeze` (stack Inertia + React), con el diseño, las rutas y las pantallas propias de InstaCost agregadas encima.
- El diseño (sidebar oscuro, tabs de Ventas/Merma/Cierres, tarjetas de estado vacío) fue recreado a partir de capturas de la app; no se copió código de la app original.
- El registro rápido de ventas ("Escribir venta") pega en `POST /ventas` (`VentaController@store`). Los botones de "Dictar venta" / "Dictar merma" (dictado por voz) quedan como puntos de extensión: se pueden conectar a la Web Speech API del navegador o a un servicio de transcripción.
