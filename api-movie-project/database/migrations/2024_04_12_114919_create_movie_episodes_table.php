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
        Schema::create('movie_episodes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("movie_id");
            $table->foreign("movie_id")->references("id")->on("movies");
            $table->string("episode_name");
            $table->enum("status", ["on", "off"]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movie_episodes');
    }
};
