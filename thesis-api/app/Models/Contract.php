<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    use HasFactory;

    protected $table = 'contract';
    protected $fillable = [
        'prof_id','title', 'description', 'status', 'path', 'starts_at', 'ends_at'
    ];
}
