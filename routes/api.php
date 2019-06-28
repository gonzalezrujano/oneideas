<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'usuarios'], function() {
    Route::post('/login', 'LoginController@login');
    Route::get('/{id}', 'UsuarioController@getUsuario');
    Route::get('/permisos/{id}', 'UsuarioController@getPermisosUsuario');
});



Route::group(['prefix' => 'eventos'], function() {
    Route::get('/usuario/{id}', 'EventoController@getEventosUsuario');
    Route::post('/envios', 'EventoController@getEnvios');
    Route::post('/remove-envios', 'EventoController@quitarEnvios');
});



Route::group(['prefix' => 'multimedia'], function() {
    //rutas de multimedia
    Route::post('/action-tool', 'MultimediaController@actionTool');
    Route::post('/ajax-get-multimedia', 'MultimediaController@ajaxGetMultimedia');
});