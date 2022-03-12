<?php

use App\Http\Controllers\ClientController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::group(['middleware' => ['auth', 'verified']], function(){
    Route::apiResources(['clients' => ClientController::class]);
    Route::get('/', fn() => Inertia::render('Dashboard'))->name('dashboard');
});

require __DIR__.'/auth.php';
