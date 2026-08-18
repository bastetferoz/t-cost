<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Cierre extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'fecha',
        'total_ventas',
        'total_merma',
    ];

    protected $casts = [
        'fecha' => 'date',
        'total_ventas' => 'decimal:2',
        'total_merma' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
