<?php

namespace App\Http\Controllers;

use App\Models\Presupuesto;
use App\Models\PresupuestoItem;
use App\Models\Receta;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class PresupuestoController extends Controller
{
    public function index(Request $request): Response
    {
        $presupuestos = Presupuesto::where('user_id', $request->user()->id)
            ->with('items.receta')
            ->latest()
            ->get()
            ->map(fn (Presupuesto $p) => [
                'id' => $p->id,
                'nombre' => $p->nombre,
                'fecha_servicio' => $p->fecha_servicio?->format('Y-m-d'),
                'descripcion' => $p->descripcion,
                'costo_total' => (float) $p->costo_total,
                'precio_venta' => (float) $p->precio_venta,
                'margen' => $p->margen,
                'items_count' => $p->items->count(),
            ]);

        $recetasDisponibles = Receta::where('user_id', $request->user()->id)
            ->with('ingredientes')
            ->get()
            ->map(fn (Receta $r) => [
                'id' => $r->id,
                'nombre' => $r->nombre,
                'rendimiento_cantidad' => $r->rendimiento_cantidad,
                'rendimiento_unidad' => $r->rendimiento_unidad,
                'costo_por_unidad' => $r->costo_por_unidad,
            ]);

        return Inertia::render('Presupuestos', [
            'presupuestos' => $presupuestos,
            'recetasDisponibles' => $recetasDisponibles,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nombre' => ['required', 'string', 'max:255'],
            'fecha_servicio' => ['nullable', 'date'],
            'descripcion' => ['nullable', 'string', 'max:2000'],
            'items' => ['array'],
            'items.*.tipo' => ['required', 'in:receta,libre'],
            'items.*.receta_id' => ['nullable', 'required_if:items.*.tipo,receta', 'exists:recetas,id'],
            'items.*.descripcion' => ['nullable', 'required_if:items.*.tipo,libre', 'string', 'max:255'],
            'items.*.cantidad' => ['nullable', 'numeric', 'min:0'],
            'items.*.unidad' => ['nullable', 'string', 'max:50'],
            'items.*.costo_unitario' => ['nullable', 'numeric', 'min:0'],
            'items.*.precio_venta_total' => ['nullable', 'numeric', 'min:0'],
        ]);

        $userId = $request->user()->id;
        $items = $validated['items'] ?? [];

        // Solo se permiten recetas del propio usuario.
        $recetaIds = collect($items)->where('tipo', 'receta')->pluck('receta_id')->filter();
        $recetas = Receta::where('user_id', $userId)
            ->whereIn('id', $recetaIds)
            ->with('ingredientes')
            ->get()
            ->keyBy('id');

        DB::transaction(function () use ($validated, $items, $userId, $recetas) {
            $costoTotal = 0;
            $precioVenta = 0;
            $filas = [];

            foreach ($items as $orden => $item) {
                $cantidad = (float) ($item['cantidad'] ?? 0);
                $precioVentaItem = (float) ($item['precio_venta_total'] ?? 0);

                if ($item['tipo'] === 'receta') {
                    $receta = $recetas->get($item['receta_id']);
                    $costoUnitario = $receta?->costo_por_unidad ?? 0;
                    $costoItem = $costoUnitario * $cantidad;

                    $filas[] = [
                        'tipo' => 'receta',
                        'receta_id' => $item['receta_id'],
                        'descripcion' => null,
                        'cantidad' => $cantidad,
                        'unidad' => $receta?->rendimiento_unidad,
                        'costo_unitario' => $costoUnitario,
                        'costo' => $costoItem,
                        'precio_venta_total' => $precioVentaItem,
                        'orden' => $orden,
                    ];
                } else {
                    $costoUnitario = (float) ($item['costo_unitario'] ?? 0);
                    $costoItem = $costoUnitario * ($cantidad ?: 1);

                    $filas[] = [
                        'tipo' => 'libre',
                        'receta_id' => null,
                        'descripcion' => $item['descripcion'] ?? null,
                        'cantidad' => $cantidad ?: 1,
                        'unidad' => $item['unidad'] ?? null,
                        'costo_unitario' => $costoUnitario,
                        'costo' => $costoItem,
                        'precio_venta_total' => $precioVentaItem,
                        'orden' => $orden,
                    ];
                }

                $costoTotal += $costoItem;
                $precioVenta += $precioVentaItem;
            }

            $presupuesto = Presupuesto::create([
                'user_id' => $userId,
                'nombre' => $validated['nombre'],
                'fecha_servicio' => $validated['fecha_servicio'] ?? null,
                'descripcion' => $validated['descripcion'] ?? null,
                'costo_total' => $costoTotal,
                'precio_venta' => $precioVenta,
            ]);

            foreach ($filas as $fila) {
                $presupuesto->items()->create($fila);
            }
        });

        return redirect()->route('presupuestos.index');
    }
}
