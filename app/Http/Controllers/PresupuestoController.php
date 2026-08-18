<?php

namespace App\Http\Controllers;

use App\Models\Presupuesto;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PresupuestoController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Presupuestos', [
            'presupuestos' => Presupuesto::where('user_id', $request->user()->id)
                ->latest()
                ->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nombre' => ['required', 'string', 'max:255'],
            'cliente' => ['nullable', 'string', 'max:255'],
            'total' => ['required', 'numeric', 'min:0'],
        ]);

        Presupuesto::create([
            'user_id' => $request->user()->id,
            ...$validated,
        ]);

        return redirect()->route('presupuestos.index');
    }
}
