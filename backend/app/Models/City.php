<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class City extends Model
{
    use HasFactory;

    // Optional: define the table name if it's not the plural of the model name
    protected $table = 'cities';

    // Mass assignable attributes
    protected $fillable = [
        'name',
    ];
}
