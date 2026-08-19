<?php

namespace App\Http\Controllers;

use App\Models\Cierre;
use App\Models\Merma;
use App\Models\Receta;
use App\Models\Venta;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CierreController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $userId = $request->user()->id;
        $fecha = now()->toDateString();

        // Evitar duplicar el cierre del mismo día.
        $existing = Cierre::where('user_id', $userId)
            ->whereDate('fecha', $fecha)
            ->first();

        if ($existing) {
            return redirect()->route('ventas.index')->with('error', 'Ya cerraste el día de hoy.');
        }

        $totalVentas = (float) Venta::where('user_id', $userId)
            ->whereDate('vendido_at', $fecha)
            ->sum('total');

        // Para merma, calculamos el costo perdido usando costo_por_unidad de la receta.
        $mermasHoy = Merma::where('user_id', $userId)
            ->whereDate('registrado_at', $fecha)
            ->with('receta.ingredientes')
            ->get();

        $totalMerma = $mermasHoy->sum(function (Merma $merma) {
            $costoPorUnidad = $merma->receta?->costo_por_unidad ?? 0;

            return $costoPorUnidad * (float) $merma->cantidad;
        });

        Cierre::create([
            'user_id' => $userId,
            'fecha' => $fecha,
            'total_ventas' => $totalVentas,
            'total_merma' => $totalMerma,
        ]);

        return redirect()->route('ventas.index')->with('success', "Día cerrado: ventas \${$totalVentas}, merma \${$totalMerma}.");
    }
}
