# InstaCost

Aplicación para calcular el costo real de recetas y llevar el control de ventas, merma y cierres de caja.

Stack: **Laravel 13** + **Inertia.js** + **React** + **Tailwind CSS**.

## Estructura

- `app/Http/Controllers` — controladores de cada sección (Dashboard, Ventas, Facturas, Ingredientes, Recetas, Producción, Presupuestos, Perfil).
- `app/Models` — `Ingrediente`, `Receta` (con su pivot `receta_ingrediente`), `Venta`, `Merma`, `Cierre`, `Presupuesto`, `User` (con los campos de negocio: `business_name`, `business_type`, `brand_color`, `logo_path`, `city`).
- `database/migrations` — tablas de `ingredientes`, `recetas`, `receta_ingrediente`, `ventas`, `mermas`, `cierres`, `presupuestos`, y los campos de negocio agregados a `users` (además de las de autenticación que trae Laravel/Breeze).

**Cadena de dependencias (igual que en la app real):** Ingredientes → Recetas → Ventas / Merma. No podés escribir una receta sin ingredientes cargados, ni registrar una venta o una merma sin al menos una receta — la UI muestra el mismo mensaje de bloqueo que la app original en cada caso ("Para armar una receta primero necesitás ingredientes...", "Para registrar una venta necesitás tener recetas...", "Primero creá recetas para poder registrar merma.").

**Qué es 1:1 verificado vs. mi mejor estimación:** el formulario de "Cargar manualmente" en Ingredientes (campos, unidades, textos) lo tomé exactamente de la app real, botón por botón. Los formularios de "Escribir receta", "Escribir venta", "Registrar merma" y "Nuevo presupuesto" son mi mejor reconstrucción funcional (mismos campos que tendría sentido pedir) porque en la cuenta real esas pantallas están bloqueadas hasta tener datos previos cargados — no pude verlas para copiarlas exactas. Si las armás en la app real y no coinciden, mandame una captura y las ajusto.
- `resources/js/Layouts/AppLayout.jsx` — layout general con el sidebar oscuro (Inicio → `/dashboard`, Facturas, Ingredientes, Recetas, Producción, Ventas, Presupuestos, Compartir la app → enlace de WhatsApp, Mi perfil, y el nombre del negocio abajo de todo).
- `resources/js/Pages` — una página Inertia/React por sección, con la copy y los botones tal como están en la app real (textos de estados vacíos, íconos/emojis, CTAs). `Ventas/Index.jsx` reproduce la pantalla de Ventas con sus 3 tabs (Ventas/Merma/Cierres), cada uno con su propio estado vacío. `Profile/Edit.jsx` reproduce "Mi perfil" (plan actual, datos del negocio, marca, ubicación, cuenta, equipo).

**Sobre el login:** la app real usa login únicamente con Google (en "Mi perfil" el email aparece como solo lectura, "se gestiona desde tu cuenta de Google"). Este repo usa el login con email/contraseña de Laravel Breeze porque no requiere credenciales externas para funcionar de una — así lo tenés andando ya. Si necesitás que sea igual (solo Google), decime y lo cambiamos a Laravel Socialite; para eso vas a necesitar crear credenciales OAuth en Google Cloud Console.

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

php artisan storage:link   # para que se vean los logos subidos en "Mi perfil"
```

Levantar el servidor:

```bash
php artisan serve
```

Y abrir `http://localhost:8000` — te va a llevar a `/dashboard` una vez logueado (creá una cuenta desde `/register`).

## Notas

- Este repo se armó a partir del skeleton oficial de `laravel/laravel` y el scaffolding de `laravel/breeze` (stack Inertia + React), con el diseño, las rutas y las pantallas propias de InstaCost agregadas encima.
- El diseño (sidebar oscuro, tabs de Ventas/Merma/Cierres, tarjetas de estado vacío) fue recreado a partir de capturas de la app; no se copió código de la app original.
- El registro rápido de ventas ("Escribir venta") pega en `POST /ventas` (`VentaController@store`). Los botones de "Dictar venta" / "Dictar merma" / "Dictar compra" / "Dictar receta" / "Dictar presupuesto" (dictado por voz) y "Escanear factura" (OCR/IA sobre la foto) quedan como puntos de extensión visuales: se pueden conectar a la Web Speech API del navegador, a un servicio de transcripción, o a un servicio de OCR/IA para extraer productos de una foto.
- Si ya tenías este repo corriendo con una base de datos migrada de una versión anterior, corré `php artisan migrate` de nuevo después de actualizar — se agregó una migración nueva (`add_business_fields_to_users_table`) para los campos de "Mi perfil".
