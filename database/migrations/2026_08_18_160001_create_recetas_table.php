<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('recetas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('nombre');
            $table->decimal('rendimiento_cantidad', 10, 2)->default(1);
            $table->string('rendimiento_unidad')->default('unidades');
            $table->decimal('precio_venta_sugerido', 10, 2)->nullable();
            $table->timestamps();
        });

        Schema::create('receta_ingrediente', function (Blueprint $table) {
            $table->id();
            $table->foreignId('receta_id')->constrained('recetas')->cascadeOnDelete();
            $table->foreignId('ingrediente_id')->constrained('ingredientes')->cascadeOnDelete();
            $table->decimal('cantidad', 10, 3);
            $table->string('unidad')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('receta_ingrediente');
        Schema::dropIfExists('recetas');
    }
};
