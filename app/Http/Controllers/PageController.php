<?php

namespace App\Http\Controllers;

use App\Models\Ingrediente;
use App\Models\Presupuesto;
use App\Models\Receta;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function dashboard(Request $request): Response
    {
        $userId = $request->user()->id;

        $gastoComprasMes = Ingrediente::where('user_id', $userId)
            ->whereBetween('created_at', [now()->startOfMonth(), now()->endOfMonth()])
            ->sum('precio_total_pagado');

        return Inertia::render('Dashboard', [
            'stats' => [
                'gastoComprasMes' => (float) $gastoComprasMes,
                'ingredientes' => Ingrediente::where('user_id', $userId)->count(),
                'recetas' => Receta::where('user_id', $userId)->count(),
                'presupuestos' => Presupuesto::where('user_id', $userId)->count(),
            ],
        ]);
    }

    public function facturas(): Response
    {
        return Inertia::render('Facturas', ['facturas' => []]);
    }

    public function produccion(): Response
    {
        return Inertia::render('Produccion', ['producciones' => []]);
    }
}
