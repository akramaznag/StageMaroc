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
        Schema::create('interns_profile', function (Blueprint $table) {
            $table->id();
            // Foreign key to users table
            $table->unsignedBigInteger(column: 'user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            // My school
            $table->enum('statut', ['Student', 'Graduate'])->nullable();
            $table->unsignedBigInteger('school_id')->nullable();
            $table->foreign('school_id')->references('id')->on('schools')->nullOnDelete();

            $table->unsignedBigInteger('education_level_id');
            $table->foreign('education_level_id')->references('id')->on('education_levels')->onDelete('cascade');

            $table->unsignedBigInteger('specialty_id');
            $table->foreign('specialty_id')->references('id')->on('specialties')->onDelete('cascade');

            // My profile
            $table->longText('presentation')->nullable();
            $table->string('cv_path')->nullable();
            $table->integer('profile_score')->default(3);
           
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('interns_profile');
    }
};
