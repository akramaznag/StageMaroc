<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\EducationLevel ;
use App\Http\Controllers\EnterpriseController;
use App\Http\Controllers\InternController;
use App\Http\Controllers\InternProfileController;
use App\Http\Controllers\InternshipApplicationController;
use App\Http\Controllers\InternshipController;
use App\Http\Controllers\SectorController;
use App\Http\Controllers\SpecialtyController;
use App\Models\InternshipApplication;
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
//sectores api
Route::middleware(['auth:api', 'role:recruiter'])->prefix('sectors')->group(function () {
    Route::get('/', [SectorController::class, 'index']);
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

    Route::post('/update_cv', [InternProfileController::class, 'update_cv']);
    Route::post('/create', [InternProfileController::class, 'create_profile']);
    Route::get('/index', [InternProfileController::class, 'index']);
    Route::get('/getInternProfileAndMetadata', [InternProfileController::class, 'getInternProfileAndMetadata']);
    Route::patch('/update/{id}',[InternProfileController::class,'update_profile']);

});

//create enterprise route
Route::middleware(['auth:api', 'role:recruiter'])->prefix('enterprise')->group(function () {
    Route::post('/create', [EnterpriseController::class, 'create_enterprise']);
    Route::get('/', [EnterpriseController::class, 'index']);
    Route::patch('/update', [EnterpriseController::class, 'update_enterprise']);
    
});

//create internship routes
Route::middleware(['auth:api', 'role:recruiter'])->prefix('internship')->group(function () {
    Route::get('/', [InternshipController::class, 'index']);
    Route::get('/list', [InternshipController::class, 'internships_list']);
    Route::post('/create', [InternshipController::class, 'create_internship']);
    Route::patch('/update', [InternshipController::class, 'update_internship']);
   
});
Route::middleware(['auth:api', 'role:intern,recruiter'])->prefix('internship_application')->group(function () {
    Route::get('/get_recruiter_applications',[InternshipApplicationController::class,'get_recruiter_applications']);
    Route::get('/get_intern_applications',[InternshipApplicationController::class,'get_intern_applications']);
    Route::get('/get_intern_application_details',[InternshipApplicationController::class,'get_intern_application_details']);
    Route::post('/apply', [InternshipApplicationController::class, 'apply']);
    Route::get('/{id}', [InternshipApplicationController::class, 'index']);
    Route::get('/update/{id}/{status}', [InternshipApplicationController::class, 'update_application_status']);
   
   
});
//public internships
Route::get('/public_internships',[InternshipController::class,'public_internships']);
Route::get('/internship/details/{id}', [InternshipController::class, 'internship_details']);
Route::post('/filter', [InternshipController::class, 'filter']);
Route::get('/search/{value}', [InternshipController::class, 'search']);

