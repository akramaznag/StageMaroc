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
        Schema::create('internship_preferences', function (Blueprint $table) {
            $table->id();
            // Foreign key to interns_profile (1-to-1)
            $table->unsignedBigInteger('intern_profile_id')->unique();
            $table->foreign('intern_profile_id')->references('id')->on('interns_profile')->onDelete('cascade');

            $table->enum('contract', ['stage fin étude', 'stage opérationnel', 'stage pré embauche']); // NO leading space!
            $table->date('start_date');
            $table->enum('duration', ['1 mois', '1 - 3 mois', '3 - 6 mois', '> 6 mois']);

            $table->foreignId('city_id')->constrained('cities')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('internship_preferences');
    }
};
