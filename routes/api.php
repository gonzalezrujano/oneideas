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
    Route::post('/add','EmpresaController@addEmpresa');
    Route::get('/{id}','EmpresaController@getEmpresa');
    Route::post('/tabla',"EmpresaController@getEmpresasTabla");
    Route::get('/paises',"EmpresaController@getPaises");
    Route::post('/delete','EmpresaController@deleteEmpresa');
    Route::post('/update','EmpresaController@updateEmpresa');
});

Route::group(['prefix' => 'biblioteca'], function() {
    //rutas de empresas
    Route::post('/', 'BibliotecaController@getBibliotecasRol');
    Route::post('/evento/files', 'BibliotecaController@getFilesEvento');
    Route::post('/evento/files/delete', 'BibliotecaController@deleteFile');
    Route::get('/evento/files/data-add', 'BibliotecaController@getDataAdd');
    Route::post('/evento/add-file','BibliotecaController@addFile');
});

Route::group(['prefix' => 'eventos'], function() {
    //rutas de eventos
    Route::get('/menus','EventoController@getMenuAppInvitado');
    Route::post('/add','EventoController@addEvento');
    Route::get('/{id}', 'EventoController@getEvento');
    Route::post('/empresa', 'EventoController@getEventosEmpresa');
    
});

