<?php

namespace App\Http\Controllers;

use App\Models\Ingrediente;
use App\Models\Receta;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class RecetaController extends Controller
{
    public function index(Request $request): Response
    {
        $userId = $request->user()->id;

        return Inertia::render('Recetas', [
            'recetas' => Receta::where('user_id', $userId)
                ->with('ingredientes')
                ->latest()
                ->get()
                ->map(fn (Receta $receta) => [
                    'id' => $receta->id,
                    'nombre' => $receta->nombre,
                    'rendimiento_cantidad' => $receta->rendimiento_cantidad,
                    'rendimiento_unidad' => $receta->rendimiento_unidad,
                    'costo_total' => $receta->costo_total,
                ]),
            'ingredientesDisponibles' => Ingrediente::where('user_id', $userId)
                ->orderBy('nombre')
                ->get(['id', 'nombre', 'compra_unidad']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nombre' => ['required', 'string', 'max:255'],
            'rendimiento_cantidad' => ['required', 'numeric', 'min:0.01'],
            'rendimiento_unidad' => ['required', 'string', 'max:255'],
            'ingredientes' => ['required', 'array', 'min:1'],
            'ingredientes.*.ingrediente_id' => ['required', 'exists:ingredientes,id'],
            'ingredientes.*.cantidad' => ['required', 'numeric', 'min:0.001'],
        ]);

        $receta = DB::transaction(function () use ($request, $validated) {
            $receta = Receta::create([
                'user_id' => $request->user()->id,
                'nombre' => $validated['nombre'],
                'rendimiento_cantidad' => $validated['rendimiento_cantidad'],
                'rendimiento_unidad' => $validated['rendimiento_unidad'],
            ]);

            foreach ($validated['ingredientes'] as $linea) {
                $receta->ingredientes()->attach($linea['ingrediente_id'], [
                    'cantidad' => $linea['cantidad'],
                ]);
            }

            return $receta;
        });

        return redirect()->route('recetas.index');
    }
}
