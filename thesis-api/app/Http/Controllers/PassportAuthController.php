<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Laravel\Socialite\Facades\Socialite;
use Auth;
use Carbon\Carbon;

class PassportAuthController extends Controller
{
    /**
     * Registration
     */
    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|min:4',
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);
 
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);
       
        $token = $user->createToken('LaravelAuthApp')->accessToken;
 
        return response()->json(['token' => $token], 200);
    }
 
    /**
     * Login
     */
    // public function login(Request $request)
    // {
    //     $data = [
    //         'email' => $request->email,
    //         'password' => $request->password
    //     ];
 
    //     if (auth()->attempt($data)) {
    //         $token = auth()->user()->createToken('LaravelAuthApp')->accessToken;
    //         return response()->json(['token' => $token], 200);
    //     } else {
    //         return response()->json(['error' => 'Unauthorised'], 401);
    //     }
    // } 

    public function login($socialiteUser)
    {
        // Create or update user based on our results
        $user = User::where('uid', $socialiteUser->uid)->first();
        if ($user === null) {
            $user = User::create(
                [
                    'name' => $socialiteUser->name,
                    'permission'=>$socialiteUser->user['eduPersonAffiliation'],
                    //'name_eng' => $socialiteUser->name_eng,
                    'email' => $socialiteUser->email,
                    'uid' => $socialiteUser->uid,
                    //'is_author' => $socialiteUser->is_author
                ]
            );
        } else {
            $user = User::where('uid', $socialiteUser->uid)->update(
                [
                    'name' => $socialiteUser->name,
                    'permission'=>$socialiteUser->user['eduPersonAffiliation'],
                    //'name_eng' => $socialiteUser->name_eng,
                    'email' => $socialiteUser->email,
                    'uid' => $socialiteUser->uid,
                    //'is_author' => $socialiteUser->is_author
                ]
            );
	    }
	
        try {
            // Get user and then try to log in and sent notification
            $user = User::where('uid', $socialiteUser->uid)->first();	    
            $attributes = ['id' => $user->id];
            Auth::login($user);
            //Notification::send($user, new UserLoggedIn());
            // $user->update([
            //     'last_login_at' => Carbon::now()->toDateTimeString(),
	        // ]);

            $token = $user->createToken('MyApp')-> accessToken;

            return response()->json(['token' => $token]);
	  
	        //return new static($attributes); 
        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            // If an error occurs log user out and clear the session
            Auth('web')->logout();
            Session::flush();
            
            // Depending on the error code sent the appropriate message
            if ($e->getCode() === 400) {
                return response()->json('Invalid request', $e->getCode());
            } else if ($e->getCode() === 401) {
                return response()->json('Invalid credentials', 401);
            }

            return response()->json('Something went wrong on the server.', $e->getCode());
        }
    }

    public function user(Request $request)
    {
        //dd($request->all());
        return new UserResource($request->user());
    }
    
    public function signIn(Request $request)
    {
        return Socialite::driver('iee')->redirect();
    }

    public function redirect(){
        //dd($request->all());
        $user = Socialite::driver('iee')->user();
        $token = $this->login($user);
        //$token = json_decode($token);
        //dd($token);
        $query = http_build_query([
            //'redirect_uri' => 'http://localhost:8000/api/oauth2/github',
            'response_type' => 'code',
            'scope' => '*',
            'access_token'=> json_encode($token)
        ]);
        //return response()->json(['message'=>$query],'200');
        //return redirect('https://github.com/login/oauth/authorize?' . $query);
        return redirect('http://localhost:4200/login?'.$query);
    }
}
