<?php

namespace Database\Seeders;

use App\Models\TipoTecnologia;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipoTecnologiaSeeder extends Seeder
{
    public function index() {
        $tipos = TipoTecnologia::all();
        return response()->json($tipos);
    }
    public function run(): void
    {
        if (TipoTecnologia::count() < 3) {
            DB::table('tipo_tecnologias')->insert([
                ['nombre' => 'Lenguajes de programacion', 'created_at' => now(), 'updated_at' => now()],
                ['nombre' => 'Frameworks', 'created_at' => now(), 'updated_at' => now()],
                ['nombre' => 'Herramientas de desarrollo', 'created_at' => now(), 'updated_at' => now()],
            ]);
        }
    }
}
