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
        Schema::create('movie_sources', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('movie_episode_id');
            $table->foreign('movie_episode_id')->references('id')->on('movie_episodes');
            $table->string('server_name');
            $table->string('source_link');
            $table->enum('status', ['on', 'off']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movie_sources');
    }
};
