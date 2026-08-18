<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('presupuestos', function (Blueprint $table) {
            if (Schema::hasColumn('presupuestos', 'cliente')) {
                $table->dropColumn('cliente');
            }
            if (Schema::hasColumn('presupuestos', 'total')) {
                $table->dropColumn('total');
            }
            $table->date('fecha_servicio')->nullable()->after('nombre');
            $table->text('descripcion')->nullable()->after('fecha_servicio');
            $table->decimal('costo_total', 12, 2)->default(0)->after('descripcion');
            $table->decimal('precio_venta', 12, 2)->default(0)->after('costo_total');
        });
    }

    public function down(): void
    {
        Schema::table('presupuestos', function (Blueprint $table) {
            $table->dropColumn(['fecha_servicio', 'descripcion', 'costo_total', 'precio_venta']);
            $table->string('cliente')->nullable();
            $table->decimal('total', 10, 2)->default(0);
        });
    }
};
