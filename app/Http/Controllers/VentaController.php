<?php

namespace App\Http\Controllers;

use App\Models\Cierre;
use App\Models\Merma;
use App\Models\Venta;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VentaController extends Controller
{
    public function index(Request $request): Response
    {
        $userId = $request->user()->id;

        return Inertia::render('Ventas/Index', [
            'ventas' => Venta::where('user_id', $userId)
                ->latest('vendido_at')
                ->get()
                ->map(fn (Venta $venta) => [
                    'id' => $venta->id,
                    'producto' => $venta->producto,
                    'cantidad' => $venta->cantidad,
                    'total' => $venta->total,
                    'fecha' => $venta->vendido_at->format('d/m/Y H:i'),
                ]),
            'mermas' => Merma::where('user_id', $userId)
                ->latest('registrado_at')
                ->get()
                ->map(fn (Merma $merma) => [
                    'id' => $merma->id,
                    'producto' => $merma->producto,
                    'cantidad' => $merma->cantidad,
                    'fecha' => $merma->registrado_at->format('d/m/Y H:i'),
                ]),
            'cierres' => Cierre::where('user_id', $userId)
                ->latest('fecha')
                ->get()
                ->map(fn (Cierre $cierre) => [
                    'id' => $cierre->id,
                    'producto' => 'Cierre del '.$cierre->fecha->format('d/m/Y'),
                    'cantidad' => '—',
                    'total' => $cierre->total_ventas,
                    'fecha' => $cierre->fecha->format('d/m/Y'),
                ]),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'producto' => ['required', 'string', 'max:255'],
            'cantidad' => ['required', 'integer', 'min:1'],
            'precio_unitario' => ['required', 'numeric', 'min:0'],
        ]);

        Venta::create([
            'user_id' => $request->user()->id,
            'producto' => $validated['producto'],
            'cantidad' => $validated['cantidad'],
            'precio_unitario' => $validated['precio_unitario'],
            'total' => $validated['cantidad'] * $validated['precio_unitario'],
            'vendido_at' => now(),
        ]);

        return redirect()->route('ventas.index');
    }
}
