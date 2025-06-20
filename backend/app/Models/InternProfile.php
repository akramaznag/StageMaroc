<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class InternProfile extends Model
{
      use HasFactory;

    // Specify table name if not plural of model (optional but recommended here)
    protected $table = 'interns_profile';

    // Mass assignable fields
    protected $fillable = [
        'user_id',
        'statut',
        'education_level_id',
        'specialty_id',
        'presentation',
        'school_id',
        'cv_path',
        'profile_score', // this line is important!

    ];

    // Define relationships

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function educationLevel()
    {
        return $this->belongsTo(EducationLevel::class);
    }

    public function specialty()
    {
        return $this->belongsTo(Specialty::class);
    }
 
}
