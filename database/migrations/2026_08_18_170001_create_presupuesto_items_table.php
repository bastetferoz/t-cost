<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('presupuesto_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('presupuesto_id')->constrained()->cascadeOnDelete();
            $table->enum('tipo', ['receta', 'libre']);
            $table->foreignId('receta_id')->nullable()->constrained()->nullOnDelete();
            $table->string('descripcion')->nullable();
            $table->decimal('cantidad', 10, 3)->nullable();
            $table->string('unidad')->nullable();
            $table->decimal('costo_unitario', 12, 2)->nullable();
            $table->decimal('costo', 12, 2)->default(0);
            $table->decimal('precio_venta_total', 12, 2)->nullable();
            $table->unsignedInteger('orden')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('presupuesto_items');
    }
};
