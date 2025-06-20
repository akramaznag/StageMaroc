<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\EducationLevel;
use App\Models\Enterprise;
use App\Models\Internship;
use App\Models\Specialty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class InternshipController extends Controller
{
    public function index(){
        $enterprise=Enterprise::where('user_id',Auth::user()->id)->first();
        return response()->json(['status'=>'success','enterprise'=>$enterprise]);
    }
    public function create_internship(Request $request)
{
    $validator = Validator::make($request->all(), [
        'user_id' => 'required|exists:users,id',
        'title' => 'required|string|max:255',
        'type' => 'required',
        'contract' => 'required',
        'start_date' => 'required|date|after_or_equal:today',
        'duration' => 'required',
        'remuneration' => 'required',
        'availability' => 'required',
        'profile_count' => 'required|integer|min:1|max:100',
        'description' => 'required|string|max:5000',
        'specialty_id' => 'required|exists:specialties,id',
        'city_id' => 'required|exists:cities,id',
        'enterprise_id' => 'required|exists:enterprises,id',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $data = $validator->validated();

    // Fetch the enterprise for this user
    $enterprise = Enterprise::where('user_id', $request->user_id)->first();

    if (!$enterprise) {
        return response()->json([
            'status' => 'error',
            'message' => 'Enterprise not found for this user.'
        ], 404);
    }

  

    // Create internship
    $internship = Internship::create([
        'enterprise_id' => $data['enterprise_id'],
        'title' => $data['title'],
        'type' => $data['type'],
        'contract' => $data['contract'],
        'start_date' => $data['start_date'],
        'duration' => $data['duration'],
        'remuneration' => $data['remuneration'],
        'availability' => $data['availability'],
        'profile_count' => $data['profile_count'],
        'description' => $data['description'],
        'specialty_id' => $data['specialty_id'],
        'city_id' => $data['city_id'],
    ]);

    return response()->json([
        'message' => 'internship created successfully.',
        'status' => 'success',
        'status_code' => 200,
    
        'internship' => $internship
    ], 200);}
    public function internships_list(){
        $enterprise=Enterprise::where('user_id',Auth::user()->id)->first();
        $internships=Internship::where('enterprise_id',$enterprise->id)->orderBy('title')->get();
           return response()->json([
            'status' => 'success',
            'internships' => $internships->map(function ($internship) {
                return [
                    'id' => $internship->id,
                    'title' => $internship->title,
                    'type' => $internship->type,
                    'contract' => $internship->contract,
                    'start_date' => $internship->start_date,
                    'duration' => $internship->duration,
                    'remuneration' => $internship->remuneration,
                    'availability' => $internship->availability,
                    'profile_count' => $internship->profile_count,
                    'description' => $internship->description,
                    'specialty_id' => $internship->specialty_id,
                    'city_id' => $internship->city_id,
                    'enterprise_id' => $internship->enterprise_id,
                    'created_at'=>$internship->created_at,
                    'status'=>$internship->status,

                    // Optional: include relationships if loaded
                    'specialty' => $internship->specialty ? $internship->specialty->specialite : null,
                    'city' => $internship->city ? $internship->city->name : null,
                    'enterprise' => $internship->enterprise ? $internship->enterprise->enterprise_name : null,
                
                         ];
                        }),
                ]);


        
    }
    public function internship_details(int $id){
        $internship=Internship::find($id);
          return response()->json([
            'message' => 'internship retrieved successfully.',
            'status' => 'success',
            'status_code' => 200,
            'internship' => [
                    'id' => $internship->id,
                    'title' => $internship->title,
                    'type' => $internship->type,
                    'contract' => $internship->contract,
                    'start_date' => $internship->start_date,
                    'duration' => $internship->duration,
                    'remuneration' => $internship->remuneration,
                    'availability' => $internship->availability,
                    'profile_count' => $internship->profile_count,
                    'description' => $internship->description,
                    'specialty_id' => $internship->specialty_id,
                    'city_id' => $internship->city_id,
                    'enterprise_id' => $internship->enterprise_id,
                    'created_at'=>$internship->created_at,
                    'status'=>$internship->status,

                    // Optional: include relationships if loaded
                    'specialty' => $internship->specialty ? $internship->specialty->specialite : null,
                    'city' => $internship->city ? $internship->city->name : null,
                    'enterprise' => $internship->enterprise ? $internship->enterprise->enterprise_name : null,
                    'enterprise_photo' => $internship->enterprise ? $internship->enterprise->photo : null,
                    'enterprise_description' => $internship->enterprise ? $internship->enterprise->description : null,
                    'enterprise_foundation_year' => $internship->enterprise ? $internship->enterprise->foundation_year : null,
                    'enterprise_country' => $internship->enterprise ? $internship->enterprise->country : null,
                    'enterprise_sector' => $internship->enterprise ? $internship->enterprise->Sector->sector_name : null,
                    'enterprise_city' => $internship->enterprise?->City?->name,

            ]
        ], 200);


    }
    public function update_internship(Request $request){
         $validator = Validator::make($request->all(), [
        'id' => 'required|exists:internships,id', 
        'user_id' => 'required|exists:users,id',
        'title' => 'required|string|max:255',
        'type' => 'required',
        'contract' => 'required',
        'start_date' => 'required|date|after_or_equal:today',
        'duration' => 'required',
        'remuneration' => 'required',
        'availability' => 'required',
        'profile_count' => 'required|integer|min:1|max:100',
        'description' => 'required|string|max:5000',
        'specialty_id' => 'required|exists:specialties,id',
        'city_id' => 'required|exists:cities,id',
        'enterprise_id' => 'required|exists:enterprises,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();
        $internship = Internship::findOrFail($request->id);
        $internship->update([
            'enterprise_id' => $data['enterprise_id'],
            'title' => $data['title'],
            'type' => $data['type'],
            'contract' => $data['contract'],
            'start_date' => $data['start_date'],
            'duration' => $data['duration'],
            'remuneration' => $data['remuneration'],
            'availability' => $data['availability'],
            'profile_count' => $data['profile_count'],
            'description' => $data['description'],
            'specialty_id' => $data['specialty_id'],
            'city_id' => $data['city_id'],
        ]);        
    return response()->json([
        'status'=>'success',
        'status_code'=>200,
        'message'=>'the internship is updated successfully',
        'internship'=>$internship,
    ]);
        
        
    }
    public function public_internships() {
    $specialties = Specialty::orderBy('specialite')->get();
    $cities = City::orderBy('name')->get(); // correction : 'name' au lieu de 'specialite'
    $education_levels = EducationLevel::get();       

    $internships = Internship::where('status','published')->orderBy('created_at', 'desc')->get(); // ✅ récupère tous les stages

    return response()->json([
        'status' => 'success',
        'status_code' => 200,
        'specialties' => $specialties,
        'cities' => $cities,
        'education_levels' => $education_levels,
        'internships' => $internships->map(function ($internship) {
            return [
                'id' => $internship->id,
                'title' => $internship->title,
                'type' => $internship->type,
                'contract' => $internship->contract,
                'start_date' => $internship->start_date,
                'duration' => $internship->duration,
                'remuneration' => $internship->remuneration,
                'availability' => $internship->availability,
                'profile_count' => $internship->profile_count,
                'description' => $internship->description,
                'specialty_id' => $internship->specialty_id,
                'city_id' => $internship->city_id,
                'enterprise_id' => $internship->enterprise_id,
                'created_at' => $internship->created_at,
                'status' => $internship->status,

                'specialty' => $internship->specialty->specialite,
                'city' => $internship->city->name,
                'enterprise' => $internship->enterprise->enterprise_name,
                'enterprise_photo' => $internship->enterprise->photo,

            ];
        }),
    ]);
}

}
