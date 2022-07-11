<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProjectController;
use App\Models\Project;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::group(['middleware' => ['auth', 'verified']], function () {
    Route::apiResources(['clients' => ClientController::class]);
    Route::resource('projects', ProjectController::class);
    Route::get('/', fn () => Inertia::render('Dashboard'))->name('dashboard');
    Route::get('/projectData', fn () => Project::query()->count());
});

require __DIR__ . '/auth.php';
