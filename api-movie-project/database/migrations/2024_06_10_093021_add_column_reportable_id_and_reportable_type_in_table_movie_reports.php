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
            $table->bigInteger('reportable_id')->nullable();
            $table->string('reportable_type')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('movie_reports', function (Blueprint $table) {
            $table->dropColumn('reportable_id');
            $table->dropColumn('reportable_type');
        });
    }
};
