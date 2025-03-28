<?php

// database/migrations/xxxx_xx_xx_xxxxxx_create_posts_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('body');
            $table->string('card_image_url')->nullable(); // New field for card image
            $table->string('banner_image_url')->nullable(); // New field for banner image
            $table->timestamps();
        });
    }

    public function down(): void
    {
      
    }
};
