<?php

namespace App\Http\Controllers;

use App\Models\Enterprise;
use App\Models\Internship;
use App\Models\InternshipApplication;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use function PHPSTORM_META\map;

class InternshipApplicationController extends Controller
{
    //this method allows to display intern infos during the application
    public function index(int $id){
        $intern=User::where('id',Auth::user()->id)->where('role','intern')->first();
        if (!$intern) {
            return response()->json(['error' => 'Utilisateur non autorisé ou profil non trouvé.'], 403);
        }
        $internship=Internship::findOrFail($id);
        $exists = InternshipApplication::where('intern_id', $intern->id)
        ->where('internship_id',$internship->id)
        ->exists();
        if ($exists){
            return response()->json([
            'status'=>'error',
            'status_code'=>400,
            'message'=>'intern has already applied to the internshi[ !',
            'has_applied'=>true
        ],400);

        }




        return response()->json([
            'status'=>'success',
            'status_code'=>200,
            'message'=>'intern infos retrieved successfully !',
            'intern'=>[
                'id' => $intern->id,
                'fullname' => $intern->getFullName(),
                'phone'=>$intern->phone,
                'email' => $intern->email,
                'cv' => $intern->internProfile->cv_path,
            ]
        ],200);

    }
    
    public function apply(Request $request){
          $validator = Validator::make($request->all(), [
            'intern_id'=>'required|exists:users,id',
            'internship_id' => 'required|exists:internships,id',
            'city_id'       => 'required|exists:cities,id',
            'fullname'      => 'required|string|max:255',
            'email'         => 'required|email|max:255',
            'phone'         => 'required|string|size:10',
        ]);
        

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();
        
        $exists = InternshipApplication::where('intern_id', $data['intern_id'])
        ->where('internship_id', $data['internship_id'])
        ->exists();

        if ($exists) {
            return response()->json(['message' => 'You have already applied to this internship.'], 409);
        }
        // Create the application
        $internship_application = InternshipApplication::create([
            'intern_id'     => $data['intern_id'], 
            'internship_id' => $data['internship_id'],
            'city_id'       => $data['city_id'],
            'fullname'      => $data['fullname'],
            'email'         => $data['email'],
            'phone'         => $data['phone'],
            'cv_path'=>''
        ]);
        if ($request->hasFile('cv')) {
                $file = $request->file('cv');
                $path = $file->store('cvs', 'public');
                $internship_application->cv_path = $path;
        } else if ($request->filled('cv')) {
            $internship_application->cv_path = $request->input('cv');
        }
        $internship_application->save();

        return response()->json([
            'message' => 'Application submitted successfully.',
            'application' => $internship_application
        ], 201);
    }
    public function get_recruiter_applications(){
        $recruiter = User::where('role','recruiter')->where('id',Auth::user()->id)->first();
        $recruiter_enterprise=Enterprise::where('user_id',$recruiter->id)->first();
        $enterprise_internships=Internship::where('enterprise_id',$recruiter_enterprise->id)
        ->orderBy('created_at')->get();
        $internship_applications = [];

        $enterprise_internships->each(function ($internship) use (&$internship_applications) {
            $applications = InternshipApplication::where('internship_id', $internship->id)
                 ->with([
            'city',
            'intern.internProfile.educationLevel',
            'intern.internProfile.specialty',
            'internship.city',
            'internship.specialty',
            'internship.enterprise',
        ]) ->get();

           foreach ($applications as $app) {
                $intern = $app->intern;
                $profile = $intern?->internProfile;
                $educationLevel = $profile?->educationLevel;
                $specialty = $profile?->specialty;
                $internship = $app->internship;

                $internship_applications[] = [
                    // Intern (Applicant) Info
                    'id'=>$app->id,
                    'status'=>$app->status,
                    'intern_full_name' => $app->fullname,
                    'intern_education_level' => $educationLevel?->level ?? 'N/A',
                    'intern_specialty' => $specialty?->specialite ?? 'N/A',
                    'intern_applied_at' => $app->created_at?->format('Y/m/d'),
                    'intern_email' => $app->email,
                    'intern_city' => $app->city?->name ?? 'N/A',
                    'intern_phone' => $app->phone,
                    'intern_cv_path' => $app->cv_path,

                    // Internship Info
                    'internship_title' => $internship?->title ?? 'N/A',
                    'internship_status' => $internship?->status ?? 'N/A',
                    'internship_start_date' => $internship?->start_date ?? 'N/A',
                    'internship_duration' => $internship?->duration ?? 'N/A',
                    'internship_city' => $internship?->city?->name ?? 'N/A',
                    'internship_profile_count' => $internship?->profile_count ?? 'N/A',
                    'internship_presence_mode' => $internship?->availability ?? 'N/A',
                    'internship_created_at' => $internship?->created_at?->format('Y/m/d'),
                ];
            }
        });
    
        return response()->json([
            'status' => 'success',
            'status_code' => 200,
            'message' => 'recruiter received application retrieved successfully',
            'applications' => $internship_applications
        ], 200);


    }
    public function update_application_status(int $id,string $status){
        $application =InternshipApplication::find($id);
        if( $application->status===$status){
                return response()->json([
                'status'=>'error',
                'status_code'=>400,
                'message'=>'application status is already updated!',
                'application'=>$application
            ],400);
        }
        $application->status=$status;
        $application->save();
        return response()->json([
            'status'=>'success',
            'status_code'=>200,
            'message'=>'application status is updated successfully!',
            'application'=>$application
        ],200);

    }
    public function get_intern_applications()
{
    $intern = User::where('role', 'intern')->where('id', Auth::user()->id)->first();
    if(!$intern){
        return response()->json([
            'status' => 'error',
            'status_code' => 400,
            'message' => 'intern was not found',
            
        ], 400);
    }
    $intern_applications = InternshipApplication::where('intern_id', $intern->id)
        ->with([ 'city','internship.enterprise', ])->get();

    $applications = [];

    foreach ($intern_applications as $app) {
    
        $internship = $app->internship;
        $enterprise=$app->internship->enterprise;

        $applications[] = [
            // Intern (Applicant) Info
            'id' => $app->id,
            'status' => $app->status,
            'intern_full_name' => $app->fullname,
            'intern_applied_at' => $app->created_at?->format('Y/m/d'),
            'intern_email' => $app->email,
            'intern_city' => $app->city?->name ?? 'N/A',
            'intern_phone' => $app->phone,
            'intern_cv_path' => $app->cv_path,

            // Internship Info
            'internship_title' => $internship?->title ?? 'N/A',
            'internship_city' => $internship?->city?->name ?? 'N/A',
            'internship_id' => $internship?->id ?? 'N/A',

            // enterprise info
            'enterprise_name'=>$enterprise->enterprise_name,
            'enterprise_photo'=>$enterprise->photo,
        ];
    }

    return response()->json([
        'status' => 'success',
        'status_code' => 200,
        'message' => 'intern applications retrieved successfully',
        'applications' => $applications,
    ], 200);

    }
    public function get_intern_application_details(){
    $intern = User::where('role', 'intern')->where('id', Auth::user()->id)->first();

    if (!$intern) {
        return response()->json([
            'status' => 'error',
            'status_code' => 400,
            'message' => 'Intern was not found',
        ], 400);
    }

    $intern_application_details = InternshipApplication::where('intern_id', $intern->id)
        ->with(['city', 'internship.enterprise', 'internship.city'])
        ->first();

    if (!$intern_application_details) {
        return response()->json([
            'status' => 'error',
            'status_code' => 404,
            'message' => 'No application found for this intern',
        ], 404);
    }

    $internship = $intern_application_details->internship;
    $enterprise = $internship?->enterprise;

    $application_details = [
        // Intern (Applicant) Info
        'id' => $intern_application_details->id,
        'status' => $intern_application_details->status,
        'intern_full_name' => $intern_application_details->fullname,
        'intern_applied_at' => $intern_application_details->created_at?->format('Y/m/d'),
        'intern_email' => $intern_application_details->email,
        'intern_city' => $intern_application_details->city?->name ?? 'N/A',
        'intern_phone' => $intern_application_details->phone,
        'intern_cv_path' => $intern_application_details->cv_path,


        // Internship Info
        'internship_title' => $internship?->title ?? 'N/A',
        'internship_city' => $internship?->city?->name ?? 'N/A',
        'internship_id' => $internship?->id ?? 'N/A',

        // Enterprise Info
        'enterprise_name' => $enterprise?->enterprise_name ?? 'N/A',
    ];

    return response()->json([
        'status' => 'success',
        'status_code' => 200,
        'message' => 'Intern application details retrieved successfully',
        'application' => $application_details
    ], 200);
}



    



    
}
