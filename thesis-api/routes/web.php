<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PassportAuthController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('sign-in', [PassportAuthController::class, 'signIn'])->name('login');
Route::get('sign-in/redirect', [PassportAuthController::class, 'redirect'])->name('redirect');

