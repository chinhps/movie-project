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
        Schema::table('movie_reports', function (Blueprint $table) {
            $table->dropForeign(['movie_id']);
            $table->dropColumn('movie_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('movie_reports', function (Blueprint $table) {
            $table->unsignedBigInteger('movie_id')->nullable();
            $table->foreign('movie_id')->references('id')->on('movies');
        });
    }
};
