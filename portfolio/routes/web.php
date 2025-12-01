<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContactoController;
use App\Http\Controllers\CurriculumController;
use App\Http\Controllers\ProyectoController;
use App\Http\Controllers\TecnologiaController;
use App\Http\Controllers\TipoTecnologiaController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('/');

Route::get('/admin', function () {
    return Inertia::render('Admin');
})->middleware(['auth', 'verified'])->name('admin');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('/proyectos', ProyectoController::class);
    Route::resource('/tecnologias', TecnologiaController::class);
    Route::resource('/tipotecnologias', TipoTecnologiaController::class);
    Route::resource('/curriculums', CurriculumController::class);
});

Route::post('/contacto', [ContactoController::class, 'send']);

Route::get('/carrusel', [ProyectoController::class, 'carrusel']);
Route::get('/conocimientos', [TecnologiaController::class, 'conocimientos']);
Route::get('/curriculum/latest', [CurriculumController::class, 'latest']);

require __DIR__.'/auth.php';
