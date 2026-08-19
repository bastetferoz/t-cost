<?php

namespace App\Http\Controllers;

use App\Models\Ingrediente;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class IngredienteController extends Controller
{
    public function index(Request $request): Response
    {
        $paginator = Ingrediente::where('user_id', $request->user()->id)
            ->latest()
            ->paginate(20)
            ->through(fn (Ingrediente $ingrediente) => [
                'id' => $ingrediente->id,
                'nombre' => $ingrediente->nombre,
                'compra_cantidad' => $ingrediente->compra_cantidad,
                'compra_unidad' => $ingrediente->compra_unidad,
                'precio_total_pagado' => $ingrediente->precio_total_pagado,
                'costo_unitario' => $ingrediente->costo_unitario,
                'stock_cantidad' => $ingrediente->stock_cantidad,
                'stock_unidad' => $ingrediente->stock_unidad,
            ]);

        return Inertia::render('Ingredientes', [
            'ingredientes' => $paginator,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nombre' => ['required', 'string', 'max:255'],
            'compra_cantidad' => ['nullable', 'numeric', 'min:0'],
            'compra_unidad' => ['nullable', 'string', 'in:G,KG,ML,L,UNIDAD,DOCENA,PAQUETE'],
            'precio_total_pagado' => ['nullable', 'numeric', 'min:0'],
            'stock_cantidad' => ['nullable', 'numeric', 'min:0'],
            'stock_unidad' => ['nullable', 'string', 'in:G,KG,ML,L,UNIDAD'],
        ]);

        Ingrediente::create([
            'user_id' => $request->user()->id,
            ...$validated,
        ]);

        return redirect()->route('ingredientes.index')->with('success', 'Ingrediente guardado correctamente.');
    }

    public function update(Request $request, Ingrediente $ingrediente): RedirectResponse
    {
        if ($ingrediente->user_id !== $request->user()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'nombre' => ['required', 'string', 'max:255'],
            'compra_cantidad' => ['nullable', 'numeric', 'min:0'],
            'compra_unidad' => ['nullable', 'string', 'in:G,KG,ML,L,UNIDAD,DOCENA,PAQUETE'],
            'precio_total_pagado' => ['nullable', 'numeric', 'min:0'],
            'stock_cantidad' => ['nullable', 'numeric', 'min:0'],
            'stock_unidad' => ['nullable', 'string', 'in:G,KG,ML,L,UNIDAD'],
        ]);

        $ingrediente->update($validated);

        return redirect()->route('ingredientes.index')->with('success', 'Ingrediente actualizado.');
    }

    public function destroy(Request $request, Ingrediente $ingrediente): RedirectResponse
    {
        if ($ingrediente->user_id !== $request->user()->id) {
            abort(403);
        }

        $ingrediente->delete();

        return redirect()->route('ingredientes.index')->with('success', 'Ingrediente eliminado.');
    }
}
