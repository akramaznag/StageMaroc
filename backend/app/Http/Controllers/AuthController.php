<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{
    public function register(Request $request){
         $request->validate([
        'first_name' => 'required|string|max:255',
        'last_name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:6',
        'phone' => 'required|string|min:10|max:10',
        'role' => 'required|string|in:intern,recruiter,admin',

    ]);

    // Create the user
     $user = User::create([
        'first_name' => $request->first_name,
        'last_name' => $request->last_name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'phone'=>$request->phone,
        'role'=>$request->role
    ]);

    // Generate JWT token for the user
    $token = Auth::login($user);

    // Return success response with token
    return response()->json([
        'status' => 'success',
        'user' => [
            'id'         => $user->id,
            'email'      => $user->email,
            'phone'      => $user->phone,
            'role'       => $user->role,
            'first_name' =>$user->first_name,
            'last_name'  => $user->last_name,
            'full_name'  => $user->getFullName(),
            'created_at' => $user->created_at,
            'has_intern_profile'=>$user->hasInternProfile()
        ],
        'authorization' => [
            'token' => $token,
            'type' => 'bearer',
        ]
    ], 201);
    }
     public function login(Request $request){
         $request->validate([
        'email' => 'required|string|email|max:255',
        'password' => 'required|string|min:6',
    ]);
   

    //  user credentials
    $credentials=$request->only('email','password');
    $token = Auth::attempt($credentials);

    if(!$token){
        return response()->json(['status' => 'error', 'message'=>"Email ou le mot de passe est incorrect"  ], 401);
    }
    
    $user = User::where('id',Auth::user()->id)->first();
    


    // Return success response with token
    return response()->json([
        'status' => 'success',
         'user' => [
            'id'         => $user->id,
            'photo'       => $user->photo,
            'email'      => $user->email,
            'phone'      => $user->phone,
            'role'       => $user->role,
            'first_name' =>$user->first_name,
            'last_name'  => $user->last_name,
            'full_name'  => $user->getFullName(),
            
            'created_at' => $user->created_at,
            'has_intern_profile'=>$user->hasInternProfile()
         ],
        'message'=>'user is logged successfully !',
        'authorization' => [
            'token' => $token,
            'type' => 'bearer',
        ],
    ], 200);
    }
    public function logout(){
        Auth::logout();
        return response()->json(['status' => 'success', 'message'=>'user logged successfully !'  ], 200);
    }
    public function refresh(){
    return response()->json(data: [
        'status' => 'success',
        'user' => Auth::user(),
        'authorisation' => [
            'token' => Auth::refresh(),
            'type' => 'bearer',
        ]
    ]);
}
    public function update_infos(Request $request){
        $user = User::where('id',Auth::user()->id)->first();
        
        $validator = Validator::make($request->all(), [
        'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        'first_name' => 'required|string|max:255',
        'last_name'  => 'required|string|max:255',
        'email'      => 'required|string|email|max:255|unique:users,email,' .$user->id,
        'phone'      => 'required|string|size:10|unique:users,phone,' .$user->id,
      ]);

                if ($validator->fails()) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Validation errors',
                        'errors' => $validator->errors()
                    ], 422);
                }

                
            
                $updated_User = User::updateOrCreate(
                    ['id' => $user->id],
                    $request->only(['first_name', 'last_name', 'email', 'phone'])
                );

                if ($request->hasFile('photo')) {
                    $file = $request->file('photo');
                    $path = $file->store('photos', 'public');
                    $updated_User->photo = $path;
                    $updated_User->save();
                }

            return response()->json([
                'status' => 'success',
                'status_code' => 200,
                'message' => 'User updated successfully!',
                'user' => [
                        'id'         => $updated_User->id,
                        'photo'       => $updated_User->photo,
                        'email'      => $updated_User->email,
                        'phone'      => $updated_User->phone,
                        'role'       => $updated_User->role,
                        'first_name' =>$updated_User->first_name,
                        'last_name'  => $updated_User->last_name,
                        'full_name'  => $updated_User->getFullName(),
                        
                        'created_at' => $updated_User->created_at,
                        'has_intern_profile'=>$updated_User->hasInternProfile()
                    ],
            ], 200);




    }
    public function update_password(Request $request ){
        $user = User::where('id',Auth::user()->id)->first();
        $validator = Validator::make($request->all(), [
        'password' => 'required|string',
        'new_password' => 'required|string|min:8',
    ]);
    if (!Hash::check($request->password, $user->password)) {
        return response()->json([
            'message' => 'Current password is incorrect.',
        ], 403);
    }

     if ($validator->fails()) {
        return response()->json([
            'errors' => $validator->errors(),
        ], 422);
    }

    $user->password = Hash::make($request->new_password);
    $user->save();

    return response()->json([
        'status'=>'success',
        'status_code'=>200,
        'message' => 'Password updated successfully.',
        'user' => [
                    'id'         => $user->id,
                    'photo'       => $user->photo,
                    'email'      => $user->email,
                    'phone'      => $user->phone,
                    'role'       => $user->role,
                    'first_name' =>$user->first_name,
                    'last_name'  => $user->last_name,
                    'full_name'  => $user->getFullName(),
                    
                    'created_at' => $user->created_at,
                    'has_intern_profile'=>$user->hasInternProfile()
                    ],

    ],200);

    }
    public function delete_user(Request $request){
         $user = User::where('id',Auth::user()->id)->first();
        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Current password is incorrect.',
            ], 403);
        }
        $user->delete();
        Auth::logout();

        return response()->json([
        'status'=>true,
        'status_code'=>200,
        'message' => 'User account deleted successfully.',
    ]);

    }

    
}
