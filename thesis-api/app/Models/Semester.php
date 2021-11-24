<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Semester extends Model
{
    use HasFactory;

    protected $table = 'semester';
    protected $fillable = ['semester','semester_full', 'sem_start_year', 'exam', 'lessons_start', 'lessons_end', 'exams_start', 'exams_end', 'is_hidden', 'is_current_prepare', 'is_current '];
}
