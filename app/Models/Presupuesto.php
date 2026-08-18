<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Presupuesto extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nombre',
        'fecha_servicio',
        'descripcion',
        'costo_total',
        'precio_venta',
    ];

    protected $casts = [
        'fecha_servicio' => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(PresupuestoItem::class)->orderBy('orden');
    }

    public function getMargenAttribute(): float
    {
        if (! $this->costo_total) {
            return 0;
        }

        return round((($this->precio_venta - $this->costo_total) / $this->costo_total) * 100, 1);
    }
}
