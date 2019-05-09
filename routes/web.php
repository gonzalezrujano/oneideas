<?php

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


Route::middleware(['guest'])->group(function(){

    //ruta del login
    Route::get('/', 'LoginController@index')->name('login');
    Route::post('/ajax-post-login', 'LoginController@ajaxPostLogin');

    //rutas del recovery password
    Route::get('/recovery-password', 'RecoveryPasswordController@index')->name('recovery-password');
    Route::post('/ajax-send-token-password', 'RecoveryPasswordController@ajaxSendTokenPassword')->name('ajax-send-token-password');
    Route::get('/form-reset-password/{token}', 'RecoveryPasswordController@formResetPassword')->name('form-reset-password');
    Route::post('/ajax-reset-password', 'RecoveryPasswordController@ajaxResetPassword')->name('ajax-reset-password');

});

Route::middleware(['auth', 'prevent-back-history'])->group(function(){

    //ruta de cierre de session
    Route::get('/logout', 'LoginController@logout')->name('logout');

    //ruta de cambio de contraseña
    Route::get('/change-password', 'ChangePasswordController@index')->name('change-password');
    Route::post('/ajax-change-password', 'ChangePasswordController@ajaxChangePassword')->name('ajax-change-password');

    Route::middleware(['check-change-password'])->group(function(){

        Route::get('/welcome', 'IndexController@welcome')->name('welcome');

        //ruta de empresas
        Route::get('/empresa', 'EmpresaController@index')->name('configuracion.empresa');
        Route::post('/ajax-empresa', 'EmpresaController@ajaxDatatables');
        Route::get('/empresa-add', 'EmpresaController@viewAdd')->name('empresa-add');
        Route::post('/ajax-empresa-add', 'EmpresaController@ajaxAdd');
        Route::get('/empresa-show/{id}/', 'EmpresaController@viewShow');
        Route::get('/empresa-edit/{id}/', 'EmpresaController@viewEdit');
        Route::post('/ajax-empresa-update', 'EmpresaController@ajaxUpdate');
        Route::post('/ajax-empresa-delete', 'EmpresaController@ajaxDelete');

        //ruta de eventos
        Route::get('/evento/{id}/', 'EventoController@index')->name('configuracion.evento');
        Route::post('/ajax-evento', 'EventoController@ajaxDatatables');
        Route::get('/evento-add/{id}/', 'EventoController@viewAdd')->name('evento-add');
        Route::get('/evento-show/{id}/', 'EventoController@viewShow');
        Route::get('/evento-edit/{id}/', 'EventoController@viewEdit');
        Route::post('/ajax-evento-add', 'EventoController@ajaxAdd');
        Route::post('/ajax-evento-update', 'EventoController@ajaxUpdate');
        Route::post('/ajax-evento-delete', 'EventoController@ajaxDelete');
        Route::post('/ajax-evento-active', 'EventoController@ajaxChangeActive');

        //ruta de usuarios
        Route::get('/usuario', 'UsuarioController@index')->name('configuracion.usuario');
        Route::post('/ajax-usuario', 'UsuarioController@ajaxDatatables');
        Route::get('/usuario-add', 'UsuarioController@viewAdd')->name('usuario-add');
        Route::post('/ajax-usuario-add', 'UsuarioController@ajaxAdd');
        Route::get('/usuario-show/{id}/', 'UsuarioController@viewShow');
        Route::get('/usuario-edit/{id}/', 'UsuarioController@viewEdit');
        Route::post('/ajax-usuario-update', 'UsuarioController@ajaxUpdate');
        Route::post('/ajax-usuario-delete', 'UsuarioController@ajaxDelete');

        //ruta de clientes
        Route::get('/cliente', 'ClienteController@index')->name('configuracion.cliente');
        Route::post('/ajax-cliente', 'ClienteController@ajaxDatatables');
        Route::get('/cliente-show/{id}/', 'ClienteController@viewShow');
        Route::get('/cliente-edit/{id}/', 'ClienteController@viewEdit');
        Route::post('/ajax-cliente-update', 'ClienteController@ajaxUpdate');
        Route::post('/ajax-cliente-active', 'ClienteController@ajaxActive');

        //ruta master
        Route::get('/ajax/equipos/{pais}', 'MasterController@ajaxEquiposByPais');
        Route::get('/ajax/eventos/{empresa}', 'MasterController@ajaxEventosByEmpresa');

        //ruta monitor
        Route::get('/monitor', 'MonitorController@index')->name('configuracion.monitor');
        Route::get('/ajax-monitor', 'MonitorController@ajaxMonitor');
        Route::post('/ajax-monitor-action', 'MonitorController@ajaxMonitorAction');

        //rutas de biblioteca
        Route::get('/biblioteca', 'BibliotecaController@index')->name('configuracion.biblioteca');
        Route::post('/ajax-biblioteca', 'BibliotecaController@ajaxDatatables');
        Route::post('/ajax-biblioteca-files', 'BibliotecaController@ajaxDatatablesFiles');
        Route::get('/biblioteca-show/{id}/', 'BibliotecaController@viewShow')->name('biblioteca-show-files');
        Route::get('/biblioteca-add/{id}/', 'BibliotecaController@viewAdd')->name('biblioteca-add');
        Route::post('/ajax-biblioteca-add-files', 'BibliotecaController@ajaxAdd');
        Route::post('/ajax-biblioteca-delete-files', 'BibliotecaController@ajaxDelete');


        //rutas de multimedia
        Route::get('/multimedia', 'MultimediaController@index')->name('multimedia');
        Route::post('/ajax-action-tool', 'MultimediaController@ajaxActionTool');
        Route::post('/ajax-get-multimedia', 'MultimediaController@ajaxGetMultimedia');

        //rutas de invitacion
        Route::get('/invitacion', 'InvitacionController@index')->name('invitados.invitacion');

        //rutas de invitados
        Route::get('/invitados', 'InvitadoController@index')->name('invitados.invitado');

        //rutas de invitados
        Route::get('/asientos', 'AsientoController@index')->name('invitados.asiento');

        //rutas de invitados
        Route::get('/regalos', 'RegaloController@index')->name('invitados.regalo');

        // Routes for Agenda
        Route::get('/agenda', 'AgendaController@index')->name('configuracion.agenda');
        Route::get('/agenda-add', 'AgendaController@viewAdd')->name('agenda-add');
        Route::post('/ajax-agenda', 'AgendaController@ajaxDatatables');
        Route::get('/agenda-show/{id}/', 'AgendaController@viewShow');
        Route::get('/agenda-edit/{id}/', 'AgendaController@viewEdit');
        Route::post('/ajax-agenda-update', 'AgendaController@ajaxUpdate');
        Route::post('/ajax-agenda-delete', 'AgendaController@ajaxDelete');

    });


});



