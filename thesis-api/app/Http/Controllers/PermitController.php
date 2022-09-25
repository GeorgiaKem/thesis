<?php

namespace App\Http\Controllers;

use App\Models\Permit;
use App\Models\Professor;
use Illuminate\Http\Request;

class PermitController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        if(isset($request->prof_id)){
            $permit = new Permit;
            $permit->prof_id = $request->prof_id;
            $permit->title = $request->title;
            $permit->sem_id = $request->sem_id;

            if(isset($request->description)){
                $permit->description = $request->description;
            }
            
            $permit->from = date('Y-m-d',strtotime($request->from));

            if(isset($request->until)){
                $permit->until = date('Y-m-d',strtotime($request->until));
            }
            

            $permit->save();

            return response()->json($permit);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Model\Permit  $permit
     * @return \Illuminate\Http\Response
     */
    public function show(Permit $permit)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Model\Permit  $permit
     * @return \Illuminate\Http\Response
     */
    public function edit(Permit $permit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Model\Permit  $permit
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $permit = Permit::find($id);
        
        $permit->title = $request->title;
        $permit->description = isset($request->description) ? $request->description : null;
        $permit->from = date('Y-m-d',strtotime($request->from));
        $permit->until = isset($request->until) ? date('Y-m-d',strtotime($request->until)) : null;

        $permit->save();
        return response()->json($permit);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $permit = Permit::findOrFail($id);

        if($permit) 
            $permit->delete(); 
        else
            return response()->json(error);
        
        return response()->json(null); 
    }
}
