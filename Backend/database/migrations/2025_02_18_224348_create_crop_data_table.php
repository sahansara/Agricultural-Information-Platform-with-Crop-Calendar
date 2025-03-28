<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('crop_data', function (Blueprint $table) {
            $table->id();
            $table->string('crop_type');
            $table->string('variety');
            $table->unsignedInteger('duration_months');
            $table->string('spacing');
            $table->unsignedInteger('feed_rate_kg_ha');
            $table->unsignedInteger('urea_kg_ha');
            $table->unsignedInteger('tsp_kg_ha');
            $table->unsignedInteger('mop_kg_ha');
            $table->unsignedInteger('yield_kg_ha');
            $table->text('others');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crop_data');
    }
};
