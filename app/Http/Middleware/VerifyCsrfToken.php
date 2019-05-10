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
        '/ajax-agenda',
        '/ajax-get-events/{id}',
        '/ajax-dt-get-agendas/{id}',
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
    ];
}
