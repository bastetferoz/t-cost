<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Venta extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'receta_id',
        'producto',
        'cantidad',
        'precio_unitario',
        'total',
        'vendido_at',
    ];

    protected $casts = [
        'vendido_at' => 'datetime',
        'precio_unitario' => 'decimal:2',
        'total' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function receta(): BelongsTo
    {
        return $this->belongsTo(Receta::class);
    }
}
