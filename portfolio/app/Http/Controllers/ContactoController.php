<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactoRequest;
use App\Http\Requests\UpdateContactoRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Models\Contacto;
use Illuminate\Support\Facades\Log; // ✅ Añadido

class ContactoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreContactoRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Contacto $contacto)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contacto $contacto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateContactoRequest $request, Contacto $contacto)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contacto $contacto)
    {
        //
    }


    public function send(Request $request)
    {
        try {
            $data = $request->validate([
                'nombre' => 'required|string',
                'apellido' => 'required|string',
                'email' => 'required|email',
                'mensaje' => 'required|string',
            ]);

            Mail::raw("Nombre: {$data['nombre']}\n\n Apellidos: {$data['apellido']}\n\n Email: {$data['email']}\n\n Mensaje: {$data['mensaje']}", function ($message) {
                $message->to('jorge.gonzalez.fuentes.dev@gmail.com')
                        ->subject('Nuevo mensaje de contacto');
            });

            Log::info('Mensaje enviado correctamente', $data);

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            Log::error('Error en send(): ' . $e->getMessage());
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
}
