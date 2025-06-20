<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enterprise extends Model
{
    protected $table = 'enterprises';

    protected $fillable = [
    'enterprise_name',
    'foundation_year',
    'country',
    'office_city',
    'sector',
    'user_id', // reste inchangé dans la base
    'type',
    'description',
    'website',
    'linkedin',
    'facebook',
];

    public function recruiter(){
    return $this->belongsTo(User::class, 'user_id');
    }
    public function City(){
        return $this->belongsTo(City::class,'office_city');
    }
    public function Sector(){
        return $this->belongsTo(Sector::class,'sector');
    }
    public function internships(){
        return $this->hasMany(Internship::class);
    }

}
