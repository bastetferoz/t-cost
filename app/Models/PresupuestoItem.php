<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PresupuestoItem extends Model
{
    protected $fillable = [
        'presupuesto_id',
        'tipo',
        'receta_id',
        'descripcion',
        'cantidad',
        'unidad',
        'costo_unitario',
        'costo',
        'precio_venta_total',
        'orden',
    ];

    public function presupuesto(): BelongsTo
    {
        return $this->belongsTo(Presupuesto::class);
    }

    public function receta(): BelongsTo
    {
        return $this->belongsTo(Receta::class);
    }
}
