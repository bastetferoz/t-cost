<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ingredientes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('nombre');
            $table->decimal('compra_cantidad', 10, 3)->nullable();
            $table->string('compra_unidad')->nullable();
            $table->decimal('precio_total_pagado', 10, 2)->nullable();
            $table->decimal('stock_cantidad', 10, 3)->nullable();
            $table->string('stock_unidad')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ingredientes');
    }
};
