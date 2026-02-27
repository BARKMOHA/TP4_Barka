<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MealPlan extends Model
{
    protected $fillable = [
        'user_id',
        'recipe_id',
        'title',
        'image',
        'planned_date'
    ];
}
