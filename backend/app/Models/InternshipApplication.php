<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;


use Illuminate\Database\Eloquent\Model;

class InternshipApplication extends Model
{
     use HasFactory;

    protected $table = 'internships_applications';

    protected $fillable = [
        'internship_id',
        'intern_id',
        'city_id',
        'fullname',
        'email',
        'phone',
        'cv_path',
        'status',
    ];

    /**
     * Relations
     */
    public function internship()
    {
        return $this->belongsTo(Internship::class);
    }

    public function intern()
    {
        return $this->belongsTo(User::class, 'intern_id');
    }

    public function city()
    {
        return $this->belongsTo(City::class);
    }
}
