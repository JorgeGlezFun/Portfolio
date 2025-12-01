<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tecnologia extends Model
{
    protected $fillable = [
        'nombre',
        'imagen_clara',
        'imagen_oscura',
        'tipo_tecnologia_id',
    ];

    public function proyectos()
    {
        return $this->belongsToMany(Proyecto::class, 'proyecto_tecnologia');
    }

    public function tipoTecnologia()
    {
        return $this->belongsTo(TipoTecnologia::class, 'tipo_tecnologia_id');
    }
}
