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
        Schema::create('hls_list', function (Blueprint $table) {
            $table->id();
            $table->string('link_m3u8');
            $table->string('slug')->unique();
            $table->enum('status', ['on', 'off']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hls_list');
    }
};
