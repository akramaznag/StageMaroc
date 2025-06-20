<?php

namespace App\Http\Controllers;

use App\Models\Sector;
use Illuminate\Http\Request;

class SectorController extends Controller
{
    public function index(){
        $sectors = Sector::orderBy('sector_name', 'asc')->get();
        return response()->json($sectors,200);
    }
}
