<?php

namespace App\Http\Controllers;

use App\Models\Proyecto;
use App\Models\Tecnologia;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Image\Image;

class ProyectoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $proyectos = Proyecto::with('tecnologias')->get();
        return inertia('Proyectos/Index', [
            'proyectos' => $proyectos
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */

    public function create()
    {
        $tecnologiasExistentes = Tecnologia::with('tipoTecnologia')->get();

        return inertia('Proyectos/Create', [
            'tecnologiasExistentes' => $tecnologiasExistentes,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $proyecto = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'imagen' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('imagen')) {
            $image = $request->file('imagen');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $imagePath = public_path('images/proyectos');
            $image->move($imagePath, $imageName);
            $proyecto['imagen'] = 'images/proyectos/' . $imageName;
        }

        $proyecto = Proyecto::create($proyecto);

        return response()->json($proyecto, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Proyecto $proyecto)
    {
        return Inertia::render('Proyectos/Show', [
            'proyecto' => $proyecto->load('tecnologias'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Proyecto $proyecto)
    {
        $proyecto = Proyecto::with('tecnologias')->find($proyecto->id);
        $tecnologiasExistentes = Tecnologia::with('tipoTecnologia')->get();

        return Inertia::render('Proyectos/Edit', [
            'proyecto' => $proyecto,
            'tecnologiasExistentes' => $tecnologiasExistentes,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request, Proyecto $proyecto)
    {
        $data = $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
            'descripcion' => 'sometimes|required|string',
            'imagen' => 'sometimes|nullable|image|max:2048',
        ]);

        if ($request->hasFile('imagen')) {
            $image = $request->file('imagen');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $imagePath = public_path('images/proyectos');
            $image->move($imagePath, $imageName);
            $data['imagen'] = 'images/proyectos/' . $imageName;
        }

        $proyecto->update($data);

        // Sincronizar tecnologías
        $tecnologiasIds = json_decode($request->input('tecnologias', '[]'), true);
        $proyecto->tecnologias()->sync($tecnologiasIds);

        // ⚡ En lugar de JSON, hacemos redirect con Inertia
        return redirect()->route('proyectos.edit', $proyecto->id)
                        ->with('success', 'Proyecto actualizado correctamente');
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Proyecto $proyecto)
    {
        if ($proyecto->imagen && file_exists(public_path($proyecto->imagen))) {
            unlink(public_path($proyecto->imagen));
        }

        $proyecto->delete();

        return response()->json(null, 204);
    }
}
