<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ventas', function (Blueprint $table) {
            $table->foreignId('receta_id')->nullable()->after('user_id')
                ->constrained('recetas')->nullOnDelete();
        });

        Schema::table('mermas', function (Blueprint $table) {
            $table->foreignId('receta_id')->nullable()->after('user_id')
                ->constrained('recetas')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('ventas', function (Blueprint $table) {
            $table->dropConstrainedForeignId('receta_id');
        });

        Schema::table('mermas', function (Blueprint $table) {
            $table->dropConstrainedForeignId('receta_id');
        });
    }
};
