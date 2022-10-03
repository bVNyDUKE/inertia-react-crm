<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TermsController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('Auth/Terms');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'termsAccepted' => 'accepted',
        ]);

        $user = $request->user();

        if ($user instanceof User) {
            $user->terms_accepted = true;
            $user->save();
        }

        return redirect(route('dashboard'));
    }
}
