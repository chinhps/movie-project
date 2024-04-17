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
        Schema::create('movie_reports', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("movie_id");
            $table->foreign("movie_id")->references("id")->on("movies");
            $table->text("description");
            $table->enum("status", ["pending", "success", "spam"]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movie_reports');
    }
};
