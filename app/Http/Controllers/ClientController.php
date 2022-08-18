<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('Clients/Index', [
            'clients' => Client::orderBy('created_at', 'desc')->paginate(10),
            ]);
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        Client::create($request->validate(
            [
            'company' => ['required', 'max:255'],
            'vat' => ['required', 'max:50'],
            'address' => ['required', 'max:2'],
        ]
        ));

        return redirect()->route('clients.index')->with('success', 'Client created');
    }

    public function show(Client $client): void
    {
        //
    }

    public function update(Request $request, Client $client): \Illuminate\Http\RedirectResponse
    {
        $client->update($request->validate(
            [
            'company' => ['required', 'max:255'],
            'vat' => ['required', 'max:50'],
            'address' => ['required', 'max:255'],
        ]
        ));

        return redirect()->route('clients.index')->with('success', 'Client updated');
    }

    public function destroy(Client $client): \Illuminate\Http\RedirectResponse
    {
        $client->delete();

        return redirect()->route('clients.index')->with('error', 'Client deleted');
    }
}
