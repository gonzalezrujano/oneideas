<?php

namespace App\Http\Middleware;

use Closure, Auth;

class CheckChangePassword
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if( Auth::user()->isChangePassword() ) {
            return redirect()->route('change-password');
        }
        return $next($request);
    }
}
