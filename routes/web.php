<?php

use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VentaController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('dashboard');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [PageController::class, 'dashboard'])->name('dashboard');
    Route::get('/facturas', [PageController::class, 'facturas'])->name('facturas');
    Route::get('/ingredientes', [PageController::class, 'ingredientes'])->name('ingredientes');
    Route::get('/recetas', [PageController::class, 'recetas'])->name('recetas');
    Route::get('/produccion', [PageController::class, 'produccion'])->name('produccion');
    Route::get('/presupuestos', [PageController::class, 'presupuestos'])->name('presupuestos');

    Route::get('/ventas', [VentaController::class, 'index'])->name('ventas.index');
    Route::post('/ventas', [VentaController::class, 'store'])->name('ventas.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/perfil', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/perfil', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/perfil', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
