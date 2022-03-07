<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contract;
use Illuminate\Support\Facades\Storage;

class ContractController extends Controller
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
            $contracts = new Contract;
            $contracts->prof_id = $request->prof_id;
            $contracts->title = (isset($request->title) ? $request->title : null);
            $contracts->description = (isset($request->description) ? $request->description : null);
            $contracts->status = (isset($request->status) ? $request->status : false);
            $contracts->path = (isset($request->path) ? $request->path : '');
            $contracts->starts_at = (isset($request->starts_at) ? date('Y-m-d',strtotime($request->starts_at)) : null);
            $contracts->ends_at = (isset($request->ends_at) ? date('Y-m-d',strtotime($request->ends_at)) : null);

            $start = $request->starts_at;
            $end = $request->ends_at;
            $now = date('Y-m-d');

            if ($now >= $start && $now <= $end){
                $contracts->status = 1;
            }else{
                $contracts->status = 0;
            }

            $contracts->save();
            return response()->json($contracts);
        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $contract = Contract::find($id);

        $contract->starts_at = date('Y-m-d',strtotime($contract->starts_at));
        $contract->ends_at = date('Y-m-d',strtotime($contract->ends_at));


        return response()->json($contract);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    
    public function update(Request $request, $id)
    {
        $contract = Contract::find($id);

        $contract->starts_at = date('Y-m-d',strtotime($request->starts_at));
        $contract->ends_at = isset($request->ends_at) ? date('Y-m-d',strtotime($request->ends_at)) : null;

        $start = date('Y-m-d',strtotime($request->starts_at));
        $end = isset($request->ends_at) ? date('Y-m-d',strtotime($request->ends_at)) : null;

        $now = date('Y-m-d');

        if ($now >= $start && $now <= $end){
            $contract->status = 1;
        }else{
            $contract->status = 0;
        }
        $image = $request->path;  // your base64 encoded

        if($image != null) {

            if($contract->path != '')
                Storage::delete($contract->path);

            $extension = explode('/',explode(',',$image)[0]);
            $extension = str_replace(';base64','',$extension[1]);

            $allowedfileExtension=['pdf','jpg','png', 'PNG'];

            //$files = $request->file('fileName'); 
            $errors = [];   
        
    
            $check = in_array($extension,$allowedfileExtension);
    
            if($check) {
                // $path = $request->fileName->store('public/contract');
                // $name = $request->fileName->getClientOriginalName();
                $image = str_replace(explode(',',$image)[0].',', '', $image);
                $image = str_replace(' ', '+', $image);
                $imageName = uniqid() . '.png';
                Storage::disk('contract')->put($imageName, base64_decode($image));
                $contract->path = 'public/contract/'.$imageName;  
                


                $contract->update((array) $contract);
            } else  {
                return response()->json(['invalid_file_format'], 422);
            }          
        }
        //$input = $request->all()->except(['path', 'region_id']);
        unset($contract['path']);
        $contract->update((array) $contract);

        return response()->json($contract);

    }

    public function download(Request $request){
        $file = substr($request->all()['path'], strrpos($request->all()['path'], '/') + 1);
        $path = storage_path('app/' . $request->all()['path']);
        return response()->download($path, $file);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
