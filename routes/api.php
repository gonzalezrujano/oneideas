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
    Route::get('/{id}', 'EventoController@getEvento');
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
    Route::post('/evento/files', 'BibliotecaController@getFilesEvento');
    Route::post('/evento/files/delete', 'BibliotecaController@deleteFile');
    Route::get('/evento/files/data-add', 'BibliotecaController@getDataAdd');
    Route::post('/evento/add-file','BibliotecaController@addFile');
});


Route::group(['prefix' => 'agendas'], function() {
    // Endpoints de agendas
    Route::post('/add', 'AgendaController@ajaxAdd');
    Route::post('/datatables', 'AgendaController@ajaxDatatables');
    Route::get('/{id}', 'AgendaController@viewShow');
    Route::post('/update', 'AgendaController@ajaxUpdate');
    Route::post('/delete', 'AgendaController@ajaxDelete');
    Route::post('/events', 'AgendaController@getEvents');
    Route::post('/datatable-get-agendas/{id}/{fecha}', 'AgendaController@datatable_get_agendas');

});


Route::group(['prefix' => 'menu'], function() {
    // Endpoints para el Menu Gastronimico Etapas
    Route::group(['prefix' => 'gastronomico'], function() {
        Route::get('/index', 'MenugEtapasController@index');
        Route::get('/estados', 'MenugEtapasController@getEstados');
        Route::get('/view-show/{id}', 'MenugEtapasController@viewShow');
        Route::get('/view-edit/{id}', 'MenugEtapasController@viewEdit');
        Route::get('/datatables', 'MenugEtapasController@datatables');
        Route::post('/agregar', 'MenugEtapasController@agregar');
        Route::post('/actualizar', 'MenugEtapasController@actualizar');
        Route::post('/eliminar/{id}', 'MenugEtapasController@eliminar');
        Route::post('/etapas', 'MenugEtapasController@ajaxDatatables');
        Route::post('/etapas-add', 'MenugEtapasController@ajaxAdd');
        Route::post('/menu-etapas-update', 'MenugEtapasController@ajaxUpdate');
        Route::post('/menu-etapas-delete', 'MenugEtapasController@ajaxDelete');        
    });
    // Endpoints para el Menu Gastronimico Platos
    Route::group(['prefix' => 'platos'], function() {
        Route::get('/', 'MenugPlatosController@getDatatables');
        Route::get('/view-add', 'MenugPlatosController@viewAdd');
        Route::get('/view-show/{id}', 'MenugPlatosController@viewShow');
        Route::get('/view-edit/{id}', 'MenugPlatosController@viewEdit');
        Route::post('/agregar', 'MenugPlatosController@agregar');
        Route::post('/actualizar', 'MenugPlatosController@actualizar');
        Route::post('/eliminar/{id}', 'MenugPlatosController@eliminar');        
    });
});