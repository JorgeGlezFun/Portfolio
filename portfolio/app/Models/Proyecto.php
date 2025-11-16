<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proyecto extends Model
{
    protected $fillable = [
        'nombre',
        'descripcion',
        'enlace',
        'imagen_clara',
        'imagen_oscura'
    ];

    public function tecnologias()
    {
        return $this->belongsToMany(Tecnologia::class, 'proyecto_tecnologia');
    }
}
