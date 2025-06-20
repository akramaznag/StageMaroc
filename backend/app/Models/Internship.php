<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Internship extends Model
{
      use HasFactory;

    /**
     * Table associated with the model.
     */
    protected $table = 'internships';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'title',
        'type',
        'contract',
        'start_date',
        'duration',
        'remuneration',
        'availability',
        'profile_count',
        'description',
        'specialty_id',
        'city_id',
        'enterprise_id',
        
    ];

    // === Relationships ===

    public function specialty()
    {
        return $this->belongsTo(Specialty::class);
    }

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function enterprise()
    {
        return $this->belongsTo(Enterprise::class);
    }
}
