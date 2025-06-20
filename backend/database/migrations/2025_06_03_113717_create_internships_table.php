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
        Schema::create('internships', function (Blueprint $table) {
            $table->id();
            $table->string('title'); 
            $table->enum('type', ['onsite', 'remote', 'hybrid'])->default('onsite'); 
            
     
            $table->enum('contract', ['stage fin étude', 'stage opérationnel', 'stage pré embauche']);   
            $table->date('start_date'); // "Démarrage"
            $table->enum('duration', ['1 mois', '1 - 3 mois', '3 - 6 mois', '> 6 mois']);            $table->enum('remuneration',['0 dh','1000 dh','1000 - 2000 dh','> 2000 dh']); // in Dirhams
            $table->enum('availability', ['fulltime', 'parttime']); // "Disponibilité"
            $table->integer('profile_count'); // "Profils"
            $table->longText('description'); // "Profils"
            $table->enum('status', ['published', 'expired', 'declined'])->default('declined');

            $table->timestamps();

            // Foreign key constraints
            $table->foreignId('specialty_id')->constrained('specialties')->onDelete('cascade');
            $table->foreignId('city_id')->constrained('cities')->onDelete('cascade');
            $table->foreignId('enterprise_id')->constrained('enterprises')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('internships');
    }
};
