<?php

namespace App\Models\MongoDB;
use Spatie\ModelCleanup\GetsCleanedUp;
use Illuminate\Database\Eloquent\Builder;
use Carbon\Carbon;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class ResetClaveCliente extends Eloquent implements GetsCleanedUp
{
    protected $connection = 'mongodb';
    protected $table = 'ResetClavesClientes';

    const CREATED_AT = 'Creado';
    const UPDATED_AT = 'Actualizado';

    public static function cleanUp(Builder $query) : Builder
    {
        return $query->where('Creado', '<', Carbon::now()->subDays(1));
    }

}
