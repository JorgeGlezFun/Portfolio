<?php

namespace App\Http\Controllers;

use App\Models\Curriculum;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class CurriculumController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Curriculums/Index', [
            'curriculums' => Curriculum::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Curriculums/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required|string|max:255',
            'archivo' => 'required|file|mimes:pdf,doc,docx|max:40960',
        ]);

        if ($request->hasFile('archivo')) {
            $file = $request->file('archivo');
            $fileName = 'Jorge_CV' . '.' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('files/curriculums'), $fileName);

            $data['archivo'] = 'files/curriculums/' . $fileName;
        }

        Curriculum::create($data);
        if ($request->ajax()) {
            return response()->json(['ok' => true]);
        }

        return redirect()->route('curriculums.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Curriculum $curriculum)
    {
        return Inertia::render('Curriculums/Show', [
            'curriculum' => $curriculum,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Curriculum $curriculum)
    {
        return Inertia::render('Curriculums/Edit', [
            'curriculum' => $curriculum,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Curriculum $curriculum)
    {
        $data = $request->validate([
            'nombre' => 'required|string|max:255',
            'archivo' => 'nullable|file|mimes:pdf,doc,docx|max:40960',
        ]);

        if ($request->hasFile('archivo')) {
            $file = $request->file('archivo');
            $fileName = 'Jorge_CV' . '.' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('files/curriculums'), $fileName);

            $data['archivo'] = 'files/curriculums/' . $fileName;
        }

        $curriculum->update($data);

        return redirect()->route('curriculums.index');
    }


    /**
     * Remove the specified resource from storage.
     */

    public function destroy(Curriculum $curriculum)
    {
        if ($curriculum->archivo && file_exists(public_path($curriculum->archivo))) {
            unlink(public_path($curriculum->archivo));
        }

        $curriculum->delete();

        return redirect()->route('curriculums.index')->with('success', 'Curriculum eliminado correctamente');
    }

    public function latest()
    {
        $curriculum = Curriculum::latest()->first();
        return response()->json([
            'url' => asset($curriculum->archivo)
        ]);
    }
}
