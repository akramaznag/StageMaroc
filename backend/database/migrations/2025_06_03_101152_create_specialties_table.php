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
        Schema::create('specialties', function (Blueprint $table) {
            $table->id();
            $table->enum('specialite', [
                'Informatique',
                'Graphisme',
                'Journalisme',
                'Marketing',
                'Commercial',
                'Ronde',
                'Ressources Humaines',
                'Finance',
                'Management',
                'Commerce',
                'Électricité',
                'Télécom'
                ])->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('specialities');
    }
};
