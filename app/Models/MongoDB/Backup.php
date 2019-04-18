<?php

namespace App\Models\MongoDB;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Backup extends Eloquent
{
    protected $connection = 'mongodb';
    protected $table = 'Backups';

    const CREATED_AT = 'Creado';
    const UPDATED_AT = 'Actualizado';

    protected $dates = ['Fecha', 'Creado', 'Actualizado'];


}
