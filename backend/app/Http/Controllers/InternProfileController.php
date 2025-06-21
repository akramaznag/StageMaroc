<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\EducationLevel;
use App\Models\InternProfile;
use App\Models\InternshipApplication;
use App\Models\InternshipPreference;
use App\Models\School;
use App\Models\Specialty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class InternProfileController extends Controller
{
    public function create_profile(Request $request){
     $request->validate([
        'education_level_id' => 'required|exists:education_levels,id',
        'specialty_id' => 'required|exists:specialties,id',
        // 'contract' => 'required|in:stage fin étude,stage opérationnel, stage pré embauche',
        'start_date' => 'required|date',
        // 'duration' => 'required|in:1 mois,1 - 3 mois,3 - 6 mois,> 6 mois',
        'city_id' => 'required|exists:cities,id',
    ]);

    $intern = User::where('id',Auth::user()->id)->first();


    $intern_profile = InternProfile::create([
        'user_id' => $intern->id,
        'education_level_id' => $request->education_level_id,
        'specialty_id' => $request->specialty_id,
    ]);

    $internship_preference = InternshipPreference::create([
        'intern_profile_id' => $intern_profile->id,
        'contract' => $request->contract,
        'start_date' => $request->start_date,
        'duration' => $request->duration,
        'city_id' => $request->city_id,
    ]);

    return response()->json([
    'user' => [
            'id'         => $intern->id,
            'email'      => $intern->email,
            'phone'      => $intern->phone,
            'role'       => $intern->role,
            'first_name' =>$intern->first_name,
            'last_name'  => $intern->last_name,
            'full_name'  => $intern->getFullName(),
            'created_at' => $intern->created_at,
            'has_intern_profile'=>$intern->hasInternProfile()
        ],
    'message' => 'Profile and internship preferences created successfully',
    'intern_profile' => $intern_profile,
    'internship_preference' => $internship_preference,
    'authorisation' => [
        'token' => Auth::refresh(), 
        'type' => 'bearer',
    ],
], 201);

    }
    public function index(){
        $intern_profile=InternProfile::where('user_id',Auth::user()->id)->first();
        $internship_preference=InternshipPreference::where('intern_profile_id',$intern_profile->id)->first();
         return response()->json([
            'internship_preference' => $internship_preference,
            'specialty'=>$intern_profile->specialty->specialite,
            'internship_preference_city'=>$internship_preference->city->name,
            'intern_profile'=>$intern_profile,
            'intern_school'=>[
                'fullname'=>$intern_profile->school->full_name,
                'shortname'=>$intern_profile->school->short_name,
            ],
            'applications_count'=>InternshipApplication::where('intern_id',Auth::user()->id)->get()->count() 

        ], 200);
        
    }
    public function getInternProfileAndMetadata(){
        $intern_profile=InternProfile::where('user_id',Auth::user()->id)->first();
        $cities=City::get();
        $specialties=Specialty::get();
        $education_levels=EducationLevel::get();
        $intern_ship_preferences=InternshipPreference::where('intern_profile_id',$intern_profile->id)->first();
        $schools = School::orderBy('type', 'asc')->orderBy('short_name', 'asc')->get();
         return response()->json([
        'success' => true,
        'message' => 'Intern profile and reference data retrieved successfully.',
        'data' => [
            'intern_profile' => $intern_profile,
            'cities' => $cities,
            'specialties' => $specialties,
            'education_levels' => $education_levels,
            'intern_ship_preferences'=>$intern_ship_preferences,
            'schools'=>$schools,
            'profile_score'=>$intern_profile->profile_score
        ]
    ], 200);
        



    }
    public function update_profile(Request $request,int $id){
         $request->validate([
        'statut' => 'required',
        'school_id' => 'required|exists:schools,id',
        'education_level_id' => 'required|exists:education_levels,id',
        'specialty_id' => 'required|exists:specialties,id',
        'presentation' => 'required|string',
        'telephone' => 'required|string',
        'cv_path' => 'nullable|file|mimes:pdf,doc,docx|max:2048',

        'contract' => 'required|string',
        'city_id' => 'required|exists:cities,id',
        'start_date' => 'required|date',
        'duration' => 'required|string',
        'profile_score'=>'required|integer'
    ]);

    $intern = InternProfile::findOrFail($id);
    $intern->update($request->only([
        'statut', 'school_id', 'education_level_id', 'specialty_id', 'presentation', 'telephone','profile_score'
    ]));

    if ($request->hasFile('cv_path')) {
        $file = $request->file('cv_path');
        $path = $file->store('cvs', 'public');
        $intern->cv_path = $path;
        $intern->save();
    }

    // Update or create internship preference
    InternshipPreference::updateOrCreate(
        ['intern_profile_id' => $intern->id],
        $request->only(['contract', 'city_id', 'start_date', 'duration'])
    );

    return response()->json([
        'message' => 'Profile updated successfully',
        'data'=>$intern
]);

    }


public function update_cv(Request $request)
{
    $validator = Validator::make($request->all(), [
        'id' => 'required|integer|exists:users,id',
        'cv_path' => 'required|file|mimes:pdf,doc,docx|max:2048',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => 'error',
            'errors' => $validator->errors(),
        ], 422);
    }

    $data = $validator->validated();
    $intern = InternProfile::find($data['id']);

    if ($request->hasFile('cv_path')) {
        $file = $request->file('cv_path');
        $cvPath = $file->store('cvs', 'public');

        $intern->cv_path = $cvPath;
        $intern->save();
    } else {
        return response()->json([
            'status' => 'error',
            'message' => 'No CV file was uploaded.'
        ], 400);
    }

    return response()->json([
        'status' => 'success',
        'message' => 'CV uploaded successfully.',
        'cv' => $cvPath
    ]);
}


}
