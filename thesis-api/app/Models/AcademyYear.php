<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademyYear extends Model
{
    use HasFactory;

    protected $fillable = ['sem_start_year','academic_name','year_is_current'];

    protected $table = 'acad_year';

}
