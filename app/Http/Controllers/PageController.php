<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function inicio(): Response
    {
        return Inertia::render('Inicio');
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
