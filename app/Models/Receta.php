<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable([
    'user_id',
    'nombre',
    'rendimiento_cantidad',
    'rendimiento_unidad',
    'vida_util_dias',
    'precio_venta_sugerido',
])]
class Receta extends Model
{
    use HasFactory;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function ingredientes(): BelongsToMany
    {
        return $this->belongsToMany(Ingrediente::class, 'receta_ingrediente')
            ->withPivot(['cantidad', 'unidad'])
            ->withTimestamps();
    }

    /**
     * Tabla de factores de conversión entre unidades compatibles.
     * Factor: cuántas unidades de "from" equivale 1 unidad de "to".
     * Ejemplo: 1 KG = 1000 G → de G a KG el factor es 0.001
     */
    private static function factorConversion(?string $from, ?string $to): ?float
    {
        if (! $from || ! $to || $from === $to) {
            return 1.0;
        }

        $conversiones = [
            'G' => ['KG' => 0.001],
            'KG' => ['G' => 1000],
            'ML' => ['L' => 0.001],
            'L' => ['ML' => 1000],
        ];

        return $conversiones[strtoupper($from)][strtoupper($to)] ?? null;
    }

    /**
     * Costo total de la receta sumando el costo proporcional de cada ingrediente.
     * Aplica conversión automática de unidades cuando la unidad de consumo
     * difiere de la unidad de compra (ej: receta usa G, ingrediente comprado en KG).
     */
    public function getCostoTotalAttribute(): float
    {
        return $this->ingredientes->sum(function (Ingrediente $ingrediente) {
            $costoUnitario = $ingrediente->costo_unitario ?? 0;
            $cantidadReceta = (float) $ingrediente->pivot->cantidad;
            $unidadReceta = $ingrediente->pivot->unidad;
            $unidadCompra = $ingrediente->compra_unidad;

            // Si las unidades son iguales o no hay conversión posible, usar directamente.
            $factor = self::factorConversion($unidadReceta, $unidadCompra);

            if ($factor === null) {
                // Unidades incompatibles (ej: G vs UNIDAD), no se convierte.
                return $costoUnitario * $cantidadReceta;
            }

            // cantidadReceta está en unidadReceta, convertimos a unidadCompra.
            return $costoUnitario * ($cantidadReceta * $factor);
        });
    }

    /**
     * Costo por unidad de rendimiento (ej: costo por medialuna dentro de una
     * docena), usado para calcular el costo de los ítems de tipo "receta"
     * dentro de un presupuesto.
     */
    public function getCostoPorUnidadAttribute(): float
    {
        if (! $this->rendimiento_cantidad) {
            return 0;
        }

        return round($this->costo_total / (float) $this->rendimiento_cantidad, 4);
    }
}
