<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
;

class SchoolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        DB::table('schools')->insert([
            [ 'short_name' => 'UM5', 'full_name' => 'Université Mohammed V de Rabat', 'type' => 'engineering', 'city_id' => 1, 'created_at' => now(), 'updated_at' => now() ],
            [ 'short_name' => 'UH2C', 'full_name' => 'Université Hassan II de Casablanca', 'type' => 'engineering', 'city_id' => 2, 'created_at' => now(), 'updated_at' => now() ],
            [ 'short_name' => 'UCA', 'full_name' => 'Université Cadi Ayyad', 'type' => 'engineering', 'city_id' => 3, 'created_at' => now(), 'updated_at' => now() ],
            [ 'short_name' => 'USMBA', 'full_name' => 'Université Sidi Mohamed Ben Abdellah', 'type' => 'engineering', 'city_id' => 4, 'created_at' => now(), 'updated_at' => now() ],
            [ 'short_name' => 'UAE', 'full_name' => 'Université Abdelmalek Essaâdi', 'type' => 'engineering', 'city_id' => 5, 'created_at' => now(), 'updated_at' => now() ],
            [ 'short_name' => 'UIR', 'full_name' => 'Université Internationale de Rabat', 'type' => 'engineering', 'city_id' => 1, 'created_at' => now(), 'updated_at' => now() ],
            [ 'short_name' => 'AUI', 'full_name' => 'Al Akhawayn University in Ifrane', 'type' => 'engineering', 'city_id' => 6, 'created_at' => now(), 'updated_at' => now() ],
            [ 'short_name' => 'UM6SS', 'full_name' => 'Université Mohammed VI des Sciences de la Santé', 'type' => 'health', 'city_id' => 2, 'created_at' => now(), 'updated_at' => now() ],
            [ 'short_name' => 'UMI', 'full_name' => 'Université Moulay Ismail', 'type' => 'engineering', 'city_id' => 7, 'created_at' => now(), 'updated_at' => now() ],
            [ 'short_name' => 'UMP', 'full_name' => 'Université Mohammed Premier', 'type' => 'engineering', 'city_id' => 8, 'created_at' => now(), 'updated_at' => now() ],
            [ 'short_name' => 'ENSAM', 'full_name' => 'École Nationale Supérieure d’Arts et Métiers', 'type' => 'engineering', 'city_id' => 2, 'created_at' => now(), 'updated_at' => now() ],
            [ 'short_name' => 'ENCG', 'full_name' => 'École Nationale de Commerce et de Gestion', 'type' => 'commerce', 'city_id' => 3, 'created_at' => now(), 'updated_at' => now() ],
            [ 'short_name' => 'ENSA', 'full_name' => 'École Nationale des Sciences Appliquées', 'type' => 'engineering', 'city_id' => 4, 'created_at' => now(), 'updated_at' => now() ],
            [ 'short_name' => 'EST', 'full_name' => 'École Supérieure de Technologie', 'type' => 'engineering', 'city_id' => 5, 'created_at' => now(), 'updated_at' => now() ],
            [ 'short_name' => 'FST', 'full_name' => 'Faculté des Sciences et Techniques', 'type' => 'engineering', 'city_id' => 6, 'created_at' => now(), 'updated_at' => now() ],
            [ 'short_name' => 'ISPITS', 'full_name' => 'Institut Supérieur des Professions Infirmières et Techniques de Santé', 'type' => 'health', 'city_id' => 7, 'created_at' => now(), 'updated_at' => now() ],
            [ 'short_name' => 'ENS', 'full_name' => 'École Normale Supérieure', 'type' => 'education', 'city_id' => 1, 'created_at' => now(), 'updated_at' => now() ],
            [ 'short_name' => 'BTS', 'full_name' => 'Brevet de Technicien Supérieur', 'type' => 'engineering', 'city_id' => 2, 'created_at' => now(), 'updated_at' => now() ],
            [ 'short_name' => 'OFPPT', 'full_name' => 'Office de la Formation Professionnelle et de la Promotion du Travail', 'type' => 'engineering', 'city_id' => 3, 'created_at' => now(), 'updated_at' => now() ],
        ]);
    }
}
