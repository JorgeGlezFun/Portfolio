<?php

namespace App\Http\Controllers;

use App\Models\Tecnologia;
use App\Models\TipoTecnologia;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TecnologiaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $tecnologias = Tecnologia::with('tipoTecnologia')->get();
    return Inertia::render('Tecnologias/Index', [
        'tecnologias' => $tecnologias,
    ]);
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $tiposExistentes = TipoTecnologia::all();

        return Inertia::render('Tecnologias/Create', [
            'tiposExistentes' => $tiposExistentes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $tecnologia = $request->validate([
            'nombre' => 'required|string|max:255',
            'imagen' => 'nullable|image|max:2048',
            'tipo_tecnologia_id' => 'required|exists:tipo_tecnologias,id',
        ]);

        if ($request->hasFile('imagen')) {
            $image = $request->file('imagen');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/tecnologias'), $imageName);
            $tecnologia['imagen'] = 'images/tecnologias/' . $imageName;
        }

        $tecnologia = Tecnologia::create($tecnologia);

        return response()->json($tecnologia, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tecnologia $tecnologia)
    {
        return Inertia::render('Tecnologias/Show', [
            'tecnologia' => $tecnologia->load('tipoTecnologia'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tecnologia $tecnologia)
    {
        $tiposExistentes = TipoTecnologia::all();

        return Inertia::render('Tecnologias/Edit', [
            'tecnologia' => $tecnologia,
            'tiposExistentes' => $tiposExistentes,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tecnologia $tecnologia)
    {
        $data = $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
            'imagen' => 'sometimes|nullable|image|max:2048',
            'tipo_tecnologia_id' => 'sometimes|required|exists:tipo_tecnologias,id',
        ]);

        if ($request->hasFile('imagen')) {
            $image = $request->file('imagen');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/tecnologias'), $imageName);
            $data['imagen'] = 'images/tecnologias/' . $imageName;
        }

        $tecnologia->update($data);

        return response()->json($tecnologia);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tecnologia $tecnologia)
    {
        if ($tecnologia->imagen && file_exists(public_path($tecnologia->imagen))) {
            unlink(public_path($tecnologia->imagen));
        }

        $tecnologia->delete();

        return response()->json(null, 204);
    }
}
