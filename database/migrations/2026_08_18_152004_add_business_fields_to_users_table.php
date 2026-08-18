<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('business_name')->nullable()->after('name');
            $table->string('business_type')->nullable()->after('business_name');
            $table->string('brand_color', 7)->nullable()->after('business_type');
            $table->string('logo_path')->nullable()->after('brand_color');
            $table->string('city')->nullable()->after('logo_path');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['business_name', 'business_type', 'brand_color', 'logo_path', 'city']);
        });
    }
};
