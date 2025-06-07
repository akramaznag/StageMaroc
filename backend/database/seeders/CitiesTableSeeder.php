<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class CitiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
          DB::table('cities')->insert([
            ['name' => 'Casablanca'],
            ['name' => 'Rabat'],
            ['name' => 'Fès'],
            ['name' => 'Marrakech'],
            ['name' => 'Tanger'],
            ['name' => 'Agadir'],
            ['name' => 'Meknès'],
            ['name' => 'Oujda'],
            ['name' => 'Kenitra'],
            ['name' => 'Tétouan'],
            ['name' => 'Safi'],
            ['name' => 'El Jadida'],
            ['name' => 'Khouribga'],
            ['name' => 'Beni Mellal'],
            ['name' => 'Nador'],
            ['name' => 'Taza'],
            ['name' => 'Settat'],
            ['name' => 'Mohammedia'],
            ['name' => 'Larache'],
            ['name' => 'Ksar El Kebir'],
            ['name' => 'Errachidia'],
            ['name' => 'Guelmim'],
            ['name' => 'Ouarzazate'],
            ['name' => 'Al Hoceima'],
            ['name' => 'Berkane'],
            ['name' => 'Inezgane'],
            ['name' => 'Dakhla'],
            ['name' => 'Laâyoune'],
            ['name' => 'Sidi Kacem'],
            ['name' => 'Sidi Slimane']
          ]);
    }
}
