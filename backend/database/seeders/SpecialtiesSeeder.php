<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SpecialtiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
          DB::table('specialties')->insert([
            ['specialite' => 'Informatique'],
            ['specialite' => 'Graphisme'],
            ['specialite' => 'Journalisme'],
            ['specialite' => 'Marketing'],
            ['specialite' => 'Commercial'],
            ['specialite' => 'Ronde'],
            ['specialite' => 'Ressources Humaines'],
            ['specialite' => 'Finance'],
            ['specialite' => 'Management'],
            ['specialite' => 'Commerce'],
            ['specialite' => 'Électricité'],
            ['specialite' => 'Télécom'],
        ]);
    }
}
