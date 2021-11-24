<?php

namespace App\Http\Controllers;

use App\Models\AcademyYear;
use Illuminate\Http\Request;

class AcademyYearController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $list = AcademyYear::all();

        return response()->json($list);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AcademyYear  $academyYear
     * @return \Illuminate\Http\Response
     */
    public function show(AcademyYear $academyYear)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\AcademyYear  $academyYear
     * @return \Illuminate\Http\Response
     */
    public function edit(AcademyYear $academyYear)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AcademyYear  $academyYear
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AcademyYear $academyYear)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AcademyYear  $academyYear
     * @return \Illuminate\Http\Response
     */
    public function destroy(AcademyYear $academyYear)
    {
        //
    }
}
