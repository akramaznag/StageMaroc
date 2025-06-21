<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    //
    protected $fillable = [
        'short_name',
        'full_name',
        'type',
        'city_id',
    ];

    /**
     * Get the city that the school belongs to.
     */
    public function city()
    {
        return $this->belongsTo(City::class);
    }
}
