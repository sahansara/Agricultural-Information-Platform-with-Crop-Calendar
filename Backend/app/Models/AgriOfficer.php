<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgriOfficer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'district',
        'agri_office_location',
        'whatsapp_link',
    ];
}
