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
            $table->string('enterprise_name');
            $table->year('foundation_year');
            $table->string('country')->default('maroc');
         // Define foreign key columns
    $table->unsignedBigInteger('office_city');
    $table->unsignedBigInteger('sector');

    // Define foreign key constraints
    $table->foreign('office_city')->references('id')->on('cities')->onDelete('cascade');
    $table->foreign('sector')->references('id')->on('sectors')->onDelete('cascade');

    $table->enum('type', ['private', 'half_public', 'public'])->default('private');
    $table->longText('description');
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
