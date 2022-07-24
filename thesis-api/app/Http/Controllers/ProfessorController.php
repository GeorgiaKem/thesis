<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Professor;
use App\Models\Semester;
use App\Models\Contract;
use App\Models\Permit;
use App\Models\Type;

class ProfessorController extends Controller
{
    public function index()
    {
        $list = Professor::with('semesters', 'academy')->get();

        return response()->json($list);
    }

    public function fetchById($id)
    {
        $professor = Professor::with('semesters', 'courses', 'contracts', 'permits')->where('prof_id', $id)->first();

        return response()->json($professor);
    }

    public function editType(Request $request, $id){

        $professor = Professor::where('prof_id','=' ,$id)->update([
            "is_monimos" => $request->state
        ]);
        return response()->json($professor);
    }



}
