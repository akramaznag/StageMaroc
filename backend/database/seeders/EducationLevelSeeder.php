<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use function Laravel\Prompts\table;
use Illuminate\Support\Facades\DB;

class EducationLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('education_levels')->insert([
            ['level'=>'bac'],
            ['level'=>'bac +2'],
            ['level'=>'bac +3'],
            ['level'=>'bac +4'],
            ['level'=>'bac +5'],
            ['level'=>'> bac+5'],
        ]);
    }
}
