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
        Schema::create('internships_applications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('internship_id');
            $table->unsignedBigInteger('intern_id');
            $table->unsignedBigInteger('city_id');
            $table->string('fullname');
            $table->string('email');
            $table->string('phone',length:10);
            $table->string('cv_path')->nullable();
            $table->foreign('internship_id')->references('id')->on('internships')->onDelete('cascade');
            $table->foreign('intern_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('city_id')->references('id')->on('cities')->onDelete('cascade');
            $table->enum('status',['accepted','in_progress','declined'])->default('in_progress');


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('internships_applications');
    }
};
