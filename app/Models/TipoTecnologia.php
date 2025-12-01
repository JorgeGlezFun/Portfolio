<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoTecnologia extends Model
{

    protected $fillable = [
        'nombre',
    ];

    public function tecnologias()
    {
        return $this->hasMany(Tecnologia::class);
    }
}
