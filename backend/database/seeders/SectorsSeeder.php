<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SectorsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
     public function run()
    {
        $sectors = [
            'Informatique / Science / Sciences de la formation / Telecom',
            'Marketing / Communication',
            'Banques / Assurance / Finance',
            'Conseils / Stratégie / Management',
            'Commerces / E-commerce',
            'Énergie / Environnement',
            'Constructions / Real Estate',
            'À l\'industrie / Automobile / Transports',
            'Media / Press / Impression',
            'Biologie / Santé',
            'Éducation / Formation',
            'Tourisme / Restauration / Hôtellerie',
            'Service Public / Administrations',
            'Autres',
        ];

        foreach ($sectors as $sector) {
            DB::table('sectors')->insert([
                'sector_name' => $sector,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
