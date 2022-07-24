<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Permit;
use App\Models\Semester;

class Permit extends Model
{
    use HasFactory;
    
    protected $fillable = ['prof_id', 'title', 'description', 'from', 'until'];

    protected $table = 'permit';

    public function professors()
    {
        return $this->belongsTo(Permit::class, 'prof_id', 'prof_id');
    }

    public function semester()
    {
        return $this->belongsTo(Semester::class, 'sem_id', 'sem_id');
    }
}
