<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CropData extends Model
{
    use HasFactory;

    protected $fillable = [
        'crop_type',
        'variety',
        'duration_months',
        'spacing',
        'feed_rate_kg_ha',
        'urea_kg_ha',
        'tsp_kg_ha',
        'mop_kg_ha',
        'yield_kg_ha',
        'others'
    ];
}
