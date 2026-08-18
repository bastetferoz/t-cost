<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function dashboard(): Response
    {
        $user = Auth::user();

        return Inertia::render('Dashboard', [
            'stats' => [
                'gastoComprasMes' => 0,
                'ingredientes' => 0,
                'recetas' => 0,
                'presupuestos' => 0,
            ],
        ]);
    }

    public function facturas(): Response
    {
        return Inertia::render('Facturas', ['facturas' => []]);
    }

    public function ingredientes(): Response
    {
        return Inertia::render('Ingredientes', ['ingredientes' => []]);
    }

    public function recetas(): Response
    {
        return Inertia::render('Recetas', ['recetas' => []]);
    }

    public function produccion(): Response
    {
        return Inertia::render('Produccion', ['producciones' => []]);
    }

    public function presupuestos(): Response
    {
        return Inertia::render('Presupuestos', ['presupuestos' => []]);
    }
}
