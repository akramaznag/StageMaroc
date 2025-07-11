<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\EducationLevel;
use App\Models\Enterprise;
use App\Models\Internship;
use App\Models\InternshipApplication;
use App\Models\School;
use App\Models\Specialty;
use App\Models\User;
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
                    'applicationsCount'=>InternshipApplication::where('internship_id', $internship->id)->count(),

                    // Optional: include relationships if loaded
                    'specialty' => $internship->specialty ? $internship->specialty->specialite : null,
                    'city' => $internship->city ? $internship->city->name : null,
                    'enterprise' => $internship->enterprise ? $internship->enterprise->enterprise_name : null,
                
                         ];
                        }),
                ]);


        
    }
    public function get_three_recruiter_internships(){
        $enterprise=Enterprise::where('user_id',Auth::user()->id)->first();
        $internships=Internship::where('enterprise_id',$enterprise->id)->orderBy('created_at','desc')->take(3)->get();
        $month_internship_count = Internship::where('enterprise_id',$enterprise->id)
        ->whereMonth('start_date',now()->month)->whereYear('start_date',now()->year)->get()->count();
           return response()->json([
            'status' => 'success',
            'month_internship_count'=>$month_internship_count,
            'internships' => $internships->map(function ($internship) {
                return [
                    'id' => $internship->id,
                    'title' => $internship->title,
                    'start_date' => $internship->start_date,
                    'duration' => $internship->duration,
                    'status'=>$internship->status
                         ];
                        }),
                ]);


        
    }
    public function internship_details(int $id){
        $internship=Internship::find($id);
        $internship_application_count=InternshipApplication::where('internship_id',$internship->id)->get()->count();
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
                    'internship_application_count'=>$internship_application_count,

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
        'status' => 'nullable|in:expired,published',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $data = $validator->validated();
    $internship = Internship::findOrFail($data['id']);

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
    $internship->status = $request->status == 'expired'?'expired':'published';
    $internship->save();



    return response()->json([
        'status' => 'success',
        'status_code' => 200,
        'message' => 'The internship is updated successfully',
        'internship' => $internship,
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


    public function filter(Request $request)
    {
        // Start building the query
        $query = Internship::query();

        // 🔹 Paid / Unpaid filter
        if (!is_null($request->is_paid)) {
            if ($request->is_paid == 1) {
                $query->where('remuneration', '!=', '0 dh'); // Paid
            } else {
                $query->where('remuneration', '=', '0 dh'); // Unpaid
            }
        }

        // 🔹 Type filter (e.g., onsite, remote, hybrid)
        if ($request->filled('type') && is_array($request->type)) {
            $query->whereIn('type', $request->type);
        }

        // 🔹 Availability filter (e.g., fulltime, parttime)
        if ($request->filled('availability') && is_array($request->availability)) {
            $query->whereIn('availability', $request->availability);
        }

        // 🔹 Specialty
        if ($request->filled('specialty_id')) {
            $query->where('specialty_id', $request->specialty_id);
        }

        // 🔹 City
        if ($request->filled('city_id')) {
            $query->where('city_id', $request->city_id);
        }

        // 🔹 Duration
        if ($request->filled('duration')) {
            $query->where('duration', $request->duration);
        }

        // 🔹 Contract (e.g., PFE, d'été)
        if ($request->filled('contract')) {
            $query->where('contract', $request->contract);
        }

        // 🔹 Execute query with optional relationships
        $internships = $query
            ->with(['city', 'specialty']) // eager-load related models if needed
            ->orderByDesc('created_at')
            ->get();

        // 🔹 Return filtered data
        return response()->json([
            'status' => 'success',
            'internships' =>  $internships->map(function ($internship) {
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
    public function search(string $value){
        
        $internships=Internship::where('title','LIKE','%'.$value.'%')->orderBy('created_at')->get();
       return response()->json([
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
     ], 200);


    }
    public function filter_recruiter_internship(Request $request){
         $validated = $request->validate([
            'status' => ['nullable', 'in:all,published,declined,expired'],
            'search_value' => ['nullable', 'string', 'max:255'],
        ]);
        $recruiter=User::where('id', Auth::user()->id)->first();
        $enterprise=Enterprise::where('user_id',$recruiter->id)->first();
        $query = Internship::query();

        $query->where('enterprise_id', $enterprise->id);

        if (isset($validated['status']) && $validated['status'] !== 'all') {
            $query->where('status', $validated['status']);
        }
        if (!empty($validated['search_value'])) {
            $query->where('title', 'like', '%' . $validated['search_value'] . '%');
        }

        $internships = $query->get();
       return response()->json([
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

                // Optional: include relationships if loaded
                'specialty' => $internship->specialty ? $internship->specialty->specialite : null,
                'city' => $internship->city ? $internship->city->name : null,
                'enterprise' => $internship->enterprise ? $internship->enterprise->enterprise_name : null,
            ];
        }),
]);

    }

}
