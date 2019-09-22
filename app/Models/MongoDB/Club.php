<?php

namespace App\Models\MongoDB;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Club extends Eloquent
{
    protected $connection = 'mongodb';
    protected $table = 'Clubs';

}
