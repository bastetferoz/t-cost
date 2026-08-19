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

        $paginator = Receta::where('user_id', $userId)
            ->with('ingredientes')
            ->latest()
            ->paginate(20)
            ->through(fn (Receta $receta) => [
                'id' => $receta->id,
                'nombre' => $receta->nombre,
                'rendimiento_cantidad' => $receta->rendimiento_cantidad,
                'rendimiento_unidad' => $receta->rendimiento_unidad,
                'vida_util_dias' => $receta->vida_util_dias,
                'costo_total' => $receta->costo_total,
                'ingredientes' => $receta->ingredientes->map(fn ($ing) => [
                    'ingrediente_id' => $ing->id,
                    'cantidad' => $ing->pivot->cantidad,
                    'unidad' => $ing->pivot->unidad,
                ]),
            ]);

        return Inertia::render('Recetas', [
            'recetas' => $paginator,
            'ingredientesDisponibles' => Ingrediente::where('user_id', $userId)
                ->orderBy('nombre')
                ->get(['id', 'nombre', 'compra_unidad']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $userId = $request->user()->id;

        $validated = $request->validate([
            'nombre' => ['required', 'string', 'max:255'],
            'rendimiento_cantidad' => ['required', 'numeric', 'min:0.01'],
            'rendimiento_unidad' => ['required', 'string', 'max:255'],
            'vida_util_dias' => ['nullable', 'integer', 'min:1'],
            'ingredientes' => ['nullable', 'array'],
            'ingredientes.*.ingrediente_id' => [
                'required',
                'exists:ingredientes,id',
                function (string $attribute, mixed $value, \Closure $fail) use ($userId) {
                    $exists = \App\Models\Ingrediente::where('id', $value)
                        ->where('user_id', $userId)
                        ->exists();
                    if (! $exists) {
                        $fail('El ingrediente seleccionado no es válido.');
                    }
                },
            ],
            'ingredientes.*.cantidad' => ['required', 'numeric', 'min:0.001'],
            'ingredientes.*.unidad' => ['nullable', 'string', 'in:G,KG,ML,L,UNIDAD'],
        ]);

        $receta = DB::transaction(function () use ($request, $validated) {
            $receta = Receta::create([
                'user_id' => $request->user()->id,
                'nombre' => $validated['nombre'],
                'rendimiento_cantidad' => $validated['rendimiento_cantidad'],
                'rendimiento_unidad' => $validated['rendimiento_unidad'],
                'vida_util_dias' => $validated['vida_util_dias'] ?? null,
            ]);

            foreach ($validated['ingredientes'] ?? [] as $linea) {
                $receta->ingredientes()->attach($linea['ingrediente_id'], [
                    'cantidad' => $linea['cantidad'],
                    'unidad' => $linea['unidad'] ?? null,
                ]);
            }

            return $receta;
        });

        return redirect()->route('recetas.index')->with('success', 'Receta creada correctamente.');
    }

    public function update(Request $request, Receta $receta): RedirectResponse
    {
        if ($receta->user_id !== $request->user()->id) {
            abort(403);
        }

        $userId = $request->user()->id;

        $validated = $request->validate([
            'nombre' => ['required', 'string', 'max:255'],
            'rendimiento_cantidad' => ['required', 'numeric', 'min:0.01'],
            'rendimiento_unidad' => ['required', 'string', 'max:255'],
            'vida_util_dias' => ['nullable', 'integer', 'min:1'],
            'ingredientes' => ['nullable', 'array'],
            'ingredientes.*.ingrediente_id' => [
                'required',
                'exists:ingredientes,id',
                function (string $attribute, mixed $value, \Closure $fail) use ($userId) {
                    $exists = \App\Models\Ingrediente::where('id', $value)
                        ->where('user_id', $userId)
                        ->exists();
                    if (! $exists) {
                        $fail('El ingrediente seleccionado no es válido.');
                    }
                },
            ],
            'ingredientes.*.cantidad' => ['required', 'numeric', 'min:0.001'],
            'ingredientes.*.unidad' => ['nullable', 'string', 'in:G,KG,ML,L,UNIDAD'],
        ]);

        DB::transaction(function () use ($receta, $validated) {
            $receta->update([
                'nombre' => $validated['nombre'],
                'rendimiento_cantidad' => $validated['rendimiento_cantidad'],
                'rendimiento_unidad' => $validated['rendimiento_unidad'],
                'vida_util_dias' => $validated['vida_util_dias'] ?? null,
            ]);

            $syncData = [];
            foreach ($validated['ingredientes'] ?? [] as $linea) {
                $syncData[$linea['ingrediente_id']] = [
                    'cantidad' => $linea['cantidad'],
                    'unidad' => $linea['unidad'] ?? null,
                ];
            }
            $receta->ingredientes()->sync($syncData);
        });

        return redirect()->route('recetas.index')->with('success', 'Receta actualizada.');
    }

    public function destroy(Request $request, Receta $receta): RedirectResponse
    {
        if ($receta->user_id !== $request->user()->id) {
            abort(403);
        }

        $receta->delete();

        return redirect()->route('recetas.index')->with('success', 'Receta eliminada.');
    }
}
