<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Type;
use App\Models\Semester;
use App\Models\AcademyYear;
use App\Models\Course;
use App\Models\Assignment;
use App\Models\Contract;

class Professor extends Model
{
    use HasFactory;

    protected $table = 'prof';

    use \Staudenmeir\EloquentHasManyDeep\HasRelationships;

    public function courses()
    {
        return $this->hasManyThrough(
            Course::class,
            Assignment::class,
            'prof_id',
            'course_id',
            'prof_id',
            'course_id'
        )->select();
    }

    public function semesters()
    {
        return $this->hasManyThrough(
            Semester::class,
            Type::class,
            'prof_id',
            'sem_id',
            'prof_id',
            'sem_id'
        );
    }

    public function academy()
    {
        return $this->hasManyDeep(
            AcademyYear::class,
            [Type::class, Semester::class],
            [
                'prof_id',
                'sem_id',
                'sem_start_year'
            ],
            [
                'prof_id',
                'prof_id',
                'sem_id',
                'sem_start_year'
            ]
            );
    }

    public function contracts()
    {
        return $this->hasMany(Contract::class, 'prof_id', 'prof_id');
    }

}
