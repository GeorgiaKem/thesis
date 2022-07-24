<?php 

namespace App\Auth\Social\Two;

use Laravel\Socialite\Two\AbstractProvider;
use Laravel\Socialite\Two\ProviderInterface;
use Laravel\Socialite\Two\User;
use Illuminate\Support\Str;


class IeeProvider extends AbstractProvider implements ProviderInterface {

    protected $scopes = ['profile'];
    public function getAuthUrl($state) 
    {
        return $this->buildAuthUrlFromBase('https://login.iee.ihu.gr/authorization', $state);
    } 

    public function getTokenUrl() 
    {
        return 'https://login.iee.ihu.gr/token';
    }

    public function getUserByToken($token)
    {
        //dd('by token');
        $userUrl = 'https://api.iee.ihu.gr/profile?access_token=' . $token;

        $response = $this->getHttpClient()->get(
            $userUrl, ['headers' => [
                'Accept' => 'application/json',
            ],
        ]);

        $user = json_decode($response->getBody(), true);

        return $user;
    }

    public function mapUserToObject(array $user)
    {
        //dd('map');
        $group = $user['eduPersonAffiliation'];
        $name_gr = $group === "staff" ? $user['cn;lang-el'] : Str::upper($user['cn;lang-el']);
        $name_eng = !empty(Str::title($user['cn'])) ? Str::title($user['cn']) : Str::ascii($user['cn;lang-el']);
        $is_author = $group === "staff";
        $email = $user['mail'];

        return (new User)->setRaw($user)->map([
            'uid' => $user['uid'],
            'name' => $name_gr,
            'name_eng' => $name_eng,
            'email' => $email,
            'is_author' => $is_author
        ]);
    }

    // public function user($code){
    //     dd($code);
    //     $client = new Client();
    //     $url = $this->getTokenUrl();

    //     $response = $client->request('POST', $url, [
    //         'form_params' => [
    //             'client_id' => env('CLIENT_ID'),
    //             'client_secret' => env('CLIENT_SECRET'),
    //             'grant_type' => 'authorization_code',
    //             'code' => $code
                
    //         ]
    //     ]);
    //     dd($response);
    // }

}