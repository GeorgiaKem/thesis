<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PassportAuthController;
use App\Http\Controllers\ProfessorController;
use App\Http\Controllers\AcademyYearController;
use App\Http\Controllers\ContractController;
use App\Http\Controllers\PermitController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', [PassportAuthController::class, 'register']);
Route::post('login', [PassportAuthController::class, 'login']);

Route::get('professors', [ProfessorController::class, 'index']);
Route::get('professor/{id}', [ProfessorController::class, 'fetchById']);
Route::get('acad_list', [AcademyYearController::class, 'index']);
Route::post('contract/create',[ContractController::class, 'store']);
Route::get('contract/show/{id}',[ContractController::class, 'show']);
Route::post('contract/update/{id}',[ContractController::class, 'update']);
Route::post('contract/download',[ContractController::class, 'download']);

Route::post('permit/create',[PermitController::class, 'store']);
Route::post('permit/update/{id}',[PermitController::class, 'update']);

Route::get('sign-in', [PassportAuthController::class, 'signIn'])->name('login');
Route::get('/sign-in/redirect', 'Auth\AuthController@redirect');



Route::middleware('auth:api')->group(function () {
    Route::resource('posts', PostController::class);
    

});
