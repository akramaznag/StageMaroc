<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class InternshipPreference extends Model
{
     use HasFactory;

    protected $table = 'internship_preferences';

    // Fillable attributes for mass assignment
    protected $fillable = [
        'intern_profile_id',
        'contract',
        'start_date',
        'duration',
        'city_id',
    ];

    // Relationship: belongs to InternProfile (1:1)
    public function internProfile()
    {
        return $this->belongsTo(InternProfile::class);
    }

    // Relationship: belongs to City
    public function city()
    {
        return $this->belongsTo(City::class);
    }
}
