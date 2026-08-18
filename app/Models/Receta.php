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
     * Costo total de la receta sumando el costo proporcional de cada ingrediente.
     */
    public function getCostoTotalAttribute(): float
    {
        return $this->ingredientes->sum(function (Ingrediente $ingrediente) {
            $costoUnitario = $ingrediente->costo_unitario ?? 0;

            return $costoUnitario * (float) $ingrediente->pivot->cantidad;
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
