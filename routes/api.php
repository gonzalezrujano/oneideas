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
    //Route::post('/ajax-get-multimedia', 'MultimediaController@ajaxGetMultimedia');
});

Route::group(['prefix' => 'empresas'], function() {
    //rutas de empresas
    Route::get('/', 'EmpresaController@getEmpresas');
});

Route::group(['prefix' => 'biblioteca'], function() {
    //rutas de empresas
    Route::post('/', 'BibliotecaController@getBibliotecasRol');
});

Route::group(['prefix' => 'agendas'], function() {
    // Endpoints de agendas
    Route::post('/add', 'AgendaController@ajaxAdd');
    Route::post('/datatables', 'AgendaController@ajaxDatatables');
    Route::get('/{id}', 'AgendaController@viewShow');
    Route::post('/update', 'AgendaController@ajaxUpdate');
    Route::post('/delete', 'AgendaController@ajaxDelete');
    Route::post('/events', 'AgendaController@get_events');
    Route::post('/datatable-get-agendas/{id}/{fecha}', 'AgendaController@datatable_get_agendas');

});
