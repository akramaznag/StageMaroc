<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Specialty extends Model
{
      use HasFactory;

    protected $table = 'specialties';

    protected $fillable = [
        'specialite',
    ];

    // Relationships
    public function internProfiles()
    {
        return $this->hasMany(InternProfile::class);
    }

    // public function internships()
    // {
    //     return $this->hasMany(Internship::class);
    // }
    
}
