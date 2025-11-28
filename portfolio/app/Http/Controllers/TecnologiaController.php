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
            'imagen_clara' => 'nullable|image|max:2048',
            'imagen_oscura' => 'nullable|image|max:2048',
            'tipo_tecnologia_id' => 'required|exists:tipo_tecnologias,id',
        ]);

        if ($request->hasFile('imagen_clara')) {
            $image = $request->file('imagen_clara');
            $imageName = uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/tecnologias'), $imageName);
            $tecnologia['imagen_clara'] = 'images/tecnologias/' . $imageName;
        }

        if ($request->hasFile('imagen_oscura')) {
            $image = $request->file('imagen_oscura');
            $imageName = uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/tecnologias'), $imageName);
            $tecnologia['imagen_oscura'] = 'images/tecnologias/' . $imageName;
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
            'imagen_clara' => 'nullable|image|max:2048',
            'imagen_oscura' => 'nullable|image|max:2048',
            'tipo_tecnologia_id' => 'sometimes|required|exists:tipo_tecnologias,id',
        ]);

        if ($request->hasFile('imagen_clara')) {
            $image = $request->file('imagen_clara');
            $imageName = uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/tecnologias'), $imageName);
            $data['imagen_clara'] = 'images/tecnologias/' . $imageName;
        }

        if ($request->hasFile('imagen_oscura')) {
            $image = $request->file('imagen_oscura');
            $imageName = uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/tecnologias'), $imageName);
            $data['imagen_oscura'] = 'images/tecnologias/' . $imageName;
        }

        $tecnologia->update($data);

        return response()->json($tecnologia);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tecnologia $tecnologia)
    {
        if ($tecnologia->imagen_clara && file_exists(public_path($tecnologia->imagen_clara))) {
            unlink(public_path($tecnologia->imagen_clara));
        }

        if ($tecnologia->imagen_oscura && file_exists(public_path($tecnologia->imagen_oscura))) {
            unlink(public_path($tecnologia->imagen_oscura));
        }

        $tecnologia->delete();

        return redirect()->route('tecnologias.index')->with('success', 'Tecnología eliminada correctamente');
    }

    public function conocimientos()
    {
        $tecnologias = Tecnologia::with('tipoTecnologia')->get();
        $tiposExistentes = TipoTecnologia::all();
        return response()->json([
            'tecnologias' => $tecnologias,
            'tiposExistentes' => $tiposExistentes,
        ]);
    }
}
