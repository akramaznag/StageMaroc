<?php

namespace App\Http\Controllers;

use App\Models\Specialty;
use Illuminate\Http\Request;

class SpecialtyController extends Controller
{
    public function index(){
        $specialties=Specialty::get();
        return response()->json($specialties);
        
    }
}
