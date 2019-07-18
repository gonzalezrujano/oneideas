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
    Route::post('/add','UsuarioController@addUsuario');
    Route::post('/delete','UsuarioController@deleteUsuario');
    Route::post('/edit','UsuarioController@editUsuario');
    Route::get('/infoEdit/{id}','UsuarioController@getInfoEdit');
    Route::post('/login', 'LoginController@login');
    Route::get('/','UsuarioController@getUsuarios');
    Route::get('/selects','UsuarioController@getSelectUsuario');
    Route::get('/{id}', 'UsuarioController@getUsuario');
    Route::get('/permisos/{id}', 'UsuarioController@getPermisosUsuario');
   
});


Route::group(['prefix' => 'eventos'], function() {
    Route::get('/usuario/{id}', 'EventoController@getEventosUsuario');
    Route::post('/envios', 'EventoController@getEnvios');
    Route::post('/remove-envios', 'EventoController@quitarEnvios');
    Route::post('/cola/add','EventoController@addCola');
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
    Route::get('/eventos/{empresa}', 'EmpresaController@getEventosPorEmpresa');
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
    Route::get('/one/{id}','EventoController@getEventoById');
    Route::post('/add','EventoController@addEvento');
    Route::post('/delete','EventoController@deleteEvento');
    Route::post('/edit','EventoController@editEvento');
    Route::get('/{id}', 'EventoController@getEvento');
    Route::post('/empresa', 'EventoController@getEventosEmpresa');
    
});

