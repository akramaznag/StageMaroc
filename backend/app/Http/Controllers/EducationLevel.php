<?php

namespace App\Http\Controllers;

use App\Models\EducationLevel as ModelsEducationLevel;
use Illuminate\Http\Request;

class EducationLevel extends Controller
{
    public function index (){
           $education_levels=ModelsEducationLevel::get();
        return response()->json($education_levels,200);
    }
}
