<?php

use App\Http\Controllers\IngredienteController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PresupuestoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecetaController;
use App\Http\Controllers\VentaController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('dashboard');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [PageController::class, 'dashboard'])->name('dashboard');
    Route::get('/facturas', [PageController::class, 'facturas'])->name('facturas');
    Route::get('/produccion', [PageController::class, 'produccion'])->name('produccion');

    Route::get('/ingredientes', [IngredienteController::class, 'index'])->name('ingredientes.index');
    Route::post('/ingredientes', [IngredienteController::class, 'store'])->name('ingredientes.store');

    Route::get('/recetas', [RecetaController::class, 'index'])->name('recetas.index');
    Route::post('/recetas', [RecetaController::class, 'store'])->name('recetas.store');

    Route::get('/presupuestos', [PresupuestoController::class, 'index'])->name('presupuestos.index');
    Route::post('/presupuestos', [PresupuestoController::class, 'store'])->name('presupuestos.store');

    Route::get('/ventas', [VentaController::class, 'index'])->name('ventas.index');
    Route::post('/ventas', [VentaController::class, 'store'])->name('ventas.store');
    Route::post('/ventas/merma', [VentaController::class, 'storeMerma'])->name('ventas.merma.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/perfil', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/perfil', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/perfil', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
