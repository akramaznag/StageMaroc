<?php

namespace App\Http\Controllers;

use App\Models\Enterprise;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class EnterpriseController extends Controller
{
    public function create_enterprise(Request $request){
        $user=User::find(Auth::user()->id);
        $request->validate([
            'enterprise_name'=>'string|required'
        ]);
        if ($user->HasEnterprise()){
            return response()->json(['status'=>'error','status_code'=>400,'message'=>'you have already created the enterprise']);
        }
        $enterprise=Enterprise::create([
            'user_id'=>$user->id,
            'enterprise_name'=>$request->enterprise_name
        ]);
        $enterprise->save();
        return response()->json([
            'status'=>'success',
            'status_code'=>201,
            'message'=>'enterprise created successfully !',
            'user'=>[
                    'id'         => $user->id,
                    'email'      => $user->email,
                    'phone'      => $user->phone,
                    'role'       => $user->role,
                    'first_name' =>$user->first_name,
                    'last_name'  => $user->last_name,
                    'full_name'  => $user->getFullName(),
                    'has_enterprise'=>$user->HasEnterprise(),
                    'created_at' => $user->created_at,
            ],
            'enterprise'=>$enterprise

        ]);
    }
    public function index(){
        $enterprise=Enterprise::where('user_id',Auth::user()->id)->first();
        return response()->json([
            'status'=>'success',
            'status_code'=>200,
            'message'=>'enterprise found successfully !',
              'enterprise' => [
                    'user_id'=>$enterprise->user_id,
                    'enterprise_name' => $enterprise->enterprise_name,
                    'foundation_year' => $enterprise?->foundation_year,
                    'country' => $enterprise->country,
                    'office_city' => $enterprise?->City?->name,
                    'office_city_id'=>$enterprise?->office_city,
                    'sector' => $enterprise?->Sector?->sector_name,
                    'sector_id' => $enterprise?->sector,
                    'type' => $enterprise?->type,
                    'description' => $enterprise?->description,
                    'website' => $enterprise->website,
                    'linkedin' => $enterprise->linkedin,
                    'facebook' => $enterprise->facebook,
                    'photo'=>$enterprise->photo
                ]
        ]);
        
        
    }
    public function update_enterprise(Request $request){
       $validator = Validator::make($request->all(), [
        'photo'=>'nullable',
        'enterprise_name' => 'required|string|max:255',
        'foundation_year' => 'nullable|digits:4|integer',
        'country' => 'nullable|string|max:100',
        'office_city_id' => 'nullable|exists:cities,id',
        'sector_id' => 'nullable|exists:sectors,id',
        'enterprise_type' => 'nullable|in:private,half_public,public',
        'description' => 'nullable|string',
        'website' => 'nullable|string',
        'linkedin' => 'nullable|string',
        'facebook' => 'nullable|string',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $data = $validator->validated();

    $enterprise = Enterprise::where('user_id', $request->user_id)->first();

    if (!$enterprise) {
        return response()->json(['error' => 'Enterprise not found for this user.'], 404);
    }

    $enterprise->update([
        'enterprise_name' => $data['enterprise_name'],
        'foundation_year' => $data['foundation_year'] ?? null,
        'country' => $data['country'] ?? 'maroc',
        'office_city' => $data['office_city_id'] ?? null,
        'sector' => $data['sector_id'] ?? null,
        'type' => $data['enterprise_type'] ?? 'private',
        'description' => $data['description'] ?? null,
        'website' => $data['website'] ?? null,
        'linkedin' => $data['linkedin'] ?? null,
        'facebook' => $data['facebook'] ?? null,
    ]);
    if ($request->hasFile('photo')){
            $photo=$request->file('photo');
             $path = $photo->store('photos', 'public');
             $enterprise->photo = $path;

    }
    $enterprise->save();

    return response()->json([
        'message' => 'Enterprise updated successfully.',
        'status'=>'success',
        'status_code'=>200,
  
         'enterprise' => [
                    'user_id'=>$enterprise->user_id,
                    'enterprise_name' => $enterprise->enterprise_name,
                    'foundation_year' => $enterprise->foundation_year,
                    'country' => $enterprise->country,
                    'office_city' => $enterprise->City->name,
                    'office_city_id'=>$enterprise->office_city,
                    'sector' => $enterprise->Sector->sector_name,
                    'sector_id' => $enterprise->sector,
                    'type' => $enterprise->type,
                    'description' => $enterprise->description,
                    'website' => $enterprise->website,
                    'linkedin' => $enterprise->linkedin,
                    'facebook' => $enterprise->facebook,
                    'photo'=>$enterprise->photo
                ]
  

    ], 200);
    }
}
