<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * Las rutas que se excluyen del CSRF.
     *
     * @var array<int, string>
     */
    protected $except = [
        'contacto', // la ruta POST de envío de correo
    ];
}
