<?php

namespace App\Http\Controllers;

use App\Models\Enterprise;
use App\Models\Internship;
use App\Models\User;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Http\Request;

class RecruiterController extends Controller
{
    public function index(){
        $recruiter = User::find(Auth::user()->id);
        $enterprise = Enterprise::where('user_id',$recruiter->id)->first();
        $enterprise_internships= Internship::where('enterprise_id',$enterprise->id)->get()->count();
        
    }
}
