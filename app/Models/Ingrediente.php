<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'user_id',
    'nombre',
    'compra_cantidad',
    'compra_unidad',
    'precio_total_pagado',
    'stock_cantidad',
    'stock_unidad',
])]
class Ingrediente extends Model
{
    use HasFactory;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Costo por unidad de compra (ej: costo por kg, por litro, por unidad).
     */
    public function getCostoUnitarioAttribute(): ?float
    {
        if (! $this->compra_cantidad || (float) $this->compra_cantidad === 0.0) {
            return null;
        }

        return round((float) $this->precio_total_pagado / (float) $this->compra_cantidad, 4);
    }
}
