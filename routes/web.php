<?php

use App\Http\Controllers\CierreController;
use App\Http\Controllers\IngredienteController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PresupuestoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecetaController;
use App\Http\Controllers\VentaController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    // Si ya está autenticado, ir al dashboard.
    if (Auth::check()) {
        return redirect()->route('dashboard');
    }

    // Si no hay ningún usuario registrado, mostrar registro.
    if (User::count() === 0) {
        return redirect()->route('register');
    }

    // Si ya hay usuarios pero no está logueado, mostrar login.
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [PageController::class, 'dashboard'])->name('dashboard');
    Route::get('/facturas', [PageController::class, 'facturas'])->name('facturas');
    Route::get('/produccion', [PageController::class, 'produccion'])->name('produccion');

    Route::get('/ingredientes', [IngredienteController::class, 'index'])->name('ingredientes.index');
    Route::post('/ingredientes', [IngredienteController::class, 'store'])->name('ingredientes.store');
    Route::put('/ingredientes/{ingrediente}', [IngredienteController::class, 'update'])->name('ingredientes.update');
    Route::delete('/ingredientes/{ingrediente}', [IngredienteController::class, 'destroy'])->name('ingredientes.destroy');

    Route::get('/recetas', [RecetaController::class, 'index'])->name('recetas.index');
    Route::post('/recetas', [RecetaController::class, 'store'])->name('recetas.store');
    Route::put('/recetas/{receta}', [RecetaController::class, 'update'])->name('recetas.update');
    Route::delete('/recetas/{receta}', [RecetaController::class, 'destroy'])->name('recetas.destroy');

    Route::get('/presupuestos', [PresupuestoController::class, 'index'])->name('presupuestos.index');
    Route::post('/presupuestos', [PresupuestoController::class, 'store'])->name('presupuestos.store');

    Route::get('/ventas', [VentaController::class, 'index'])->name('ventas.index');
    Route::post('/ventas', [VentaController::class, 'store'])->name('ventas.store');
    Route::post('/ventas/merma', [VentaController::class, 'storeMerma'])->name('ventas.merma.store');

    Route::post('/cierres', [CierreController::class, 'store'])->name('cierres.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/perfil', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/perfil', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/perfil', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
