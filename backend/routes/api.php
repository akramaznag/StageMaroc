<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\EducationLevel ;
use App\Http\Controllers\InternController;
use App\Http\Controllers\InternProfileController;
use App\Http\Controllers\SpecialtyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('api')->get('/test', function (Request $request) {
    return response()->json(['message' => 'API is working']);
});

// Auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware(middleware: ['auth:api']);
Route::post('/refresh', [AuthController::class, 'refresh'])->middleware(['auth:api']);

//user route
Route::middleware(['auth:api'])->prefix('user')->group(function () {
    Route::patch('/update_infos', [AuthController::class, 'update_infos']);
    Route::post('/update_password', [AuthController::class, 'update_password']);
    Route::post('/delete',[AuthController::class,'delete_user']);

});

//education_level
Route::middleware(['auth:api'])->prefix('education_level')->group(function () {
    Route::get('/', [EducationLevel::class, 'index']);
});


//specialties api
Route::middleware(['auth:api', 'role:intern,recruiter'])->prefix('specialties')->group(function () {
    Route::get('/', [SpecialtyController::class, 'index']);
});
//cities api
Route::middleware(['auth:api', 'role:intern,recruiter'])->prefix('cities')->group(function () {
    Route::get('/', [CityController::class, 'index']);
});

//create intern_profile
Route::middleware(['auth:api', 'role:intern'])->prefix('intern_profile')->group(function () {
    Route::post('/create', [InternProfileController::class, 'create_profile']);
    Route::get('/index', [InternProfileController::class, 'index']);
    Route::get('/getInternProfileAndMetadata', [InternProfileController::class, 'getInternProfileAndMetadata']);
    Route::patch('/update/{id}',[InternProfileController::class,'update_profile']);
});