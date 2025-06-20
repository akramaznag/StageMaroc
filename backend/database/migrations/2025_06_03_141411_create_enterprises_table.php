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
        Schema::create('enterprises', function (Blueprint $table) {
            $table->id();
            $table->string('photo')->nullable(true);
            $table->unsignedBigInteger('user_id')->unique();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('enterprise_name');
            $table->year('foundation_year')->nullable();
            $table->string('country')->default('maroc')->nullable();
         // Define foreign key columns
            $table->unsignedBigInteger('office_city')->nullable();
            $table->unsignedBigInteger('sector')->nullable();

            // Define foreign key constraints
            $table->foreign('office_city')->references('id')->on('cities')->onDelete('cascade');
            $table->foreign('sector')->references('id')->on('sectors')->onDelete('cascade');

            $table->enum('type', ['private', 'half_public', 'public'])->default('private')->nullable();
            $table->longText('description')->nullable();
            $table->string('website')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('facebook')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enterprises');
    }
};
