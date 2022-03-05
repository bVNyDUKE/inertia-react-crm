<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index()
    {
        return inertia('Clients', [
            'clients' => Client::orderBy('created_at','desc')->paginate(10)
            ]);
    }

    public function store(Request $request)
    {
        Client::create($request->validate([
            'company' => ['required', 'max:255'],
            'vat' => ['required', 'max:50'],
            'address' => ['required', 'max:2'],
        ]
        ));

        return redirect()->route('clients.index');
    }

    public function show(Client $client)
    {
        //
    }

    public function update(Request $request, Client $client)
    {
        $client->update($request->validate([
            'company' => ['required', 'max:255'],
            'vat' => ['required', 'max:50'],
            'address' => ['required', 'max:255'],
        ]
        ));

        return redirect()->route('clients.index');
    }

    public function destroy(Client $client)
    {
        $client->delete();

        return redirect()->route('clients.index');
    }
}
