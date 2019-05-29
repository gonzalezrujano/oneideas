<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * Indicates whether the XSRF-TOKEN cookie should be set on the response.
     *
     * @var bool
     */
    protected $addHttpCookie = true;

    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        '/ajax-menu-platos-delete',
        '/ajax-menu-platos-add',
        '/ajax-menu-platos-update',
        '/ajax-menu-platos',
        '/ajax-menu-etapas-delete',
        '/ajax-menu-etapas-add',
        '/ajax-menu-etapas',
        '/ajax-menu-etapas-update',
        '/ajax-agenda',
        '/ajax-get-events',
        '/ajax-dt-get-agendas/*',
        '/ajax-agenda-add',
        '/ajax-agenda-update',
        'ajax-agenda-delete',
        '/ajax-empresa',
        '/ajax-empresa-add',
        '/ajax-empresa-update',
        '/ajax-empresa-delete',
        '/ajax-usuario',
        '/ajax-usuario-add',
        '/ajax-usuario-update',
        '/ajax-usuario-delete',
        '/ajax-cliente',
        '/ajax-cliente-update',
        '/ajax-cliente-active',
        '/ajax-evento',
        '/ajax-evento-add',
        '/ajax-evento-update',
        '/ajax-evento-delete',
        '/ajax-evento-active',
        '/ajax-biblioteca',
        '/ajax-biblioteca-files',
        '/ajax-biblioteca-delete-files',
        '/ajax-biblioteca-add-files',
        '/ajax-invitacion',
        '/ajax-invitacion-files',
        '/ajax-invitacion-delete-files',
        '/ajax-invitacion-add-files',
    ];
}
