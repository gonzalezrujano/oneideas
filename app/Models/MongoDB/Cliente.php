<?php

namespace App\Models\MongoDB;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Carbon\Carbon;

class Cliente extends Eloquent
{
    protected $connection = 'mongodb';
    protected $table = 'Clientes';

    const CREATED_AT = 'Creado';
    const UPDATED_AT = 'Actualizado';

    //scope para buscar por borrado
    public function scopeBorrado($query, $flag) {
        return $query->where('Borrado', $flag);
    }

    //scope para buscar por activo
    public function scopeActivo($query, $flag) {
        return $query->where('Activo', $flag);
    }

    //scope para buscar por tipo de cuenta
    public function scopeCuenta($query, $flag) {
        return $query->where('TipoCuenta', $flag);
    }
}
