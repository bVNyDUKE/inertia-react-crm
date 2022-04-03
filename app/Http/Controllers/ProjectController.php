<?php

namespace App\Http\Controllers;

use App\Enums\ProjectStatus;
use App\Models\Client;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        return inertia(
            'Projects/Index',
            ['projects' => Project::select('id', 'user_id', 'client_id', 'title', 'status')
            ->with(['user:id,name', 'client:id,company'])
            ->orderBy('created_at', 'desc')
            ->paginate(10),
            ]
        );
    }

    public function create()
    {
        return inertia(
            'Projects/Create',
            ['clients' => Client::select('id', 'company')->get(),
            'users' =>User::select('id', 'name')->get(), ]
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'description' => 'required|max:6000',
            'client_id' => 'required|exists:clients,id',
            'user_id' => 'required|exists:users,id',
        ]);

        Project::create([...$validated, 'status' => ProjectStatus::ACTIVE]);

        return redirect()->route('projects.index');
    }

    public function show(Project $project)
    {
        //
    }

    public function edit(Project $project)
    {
        //
    }

    public function update(Request $request, Project $project)
    {
        //
    }

    public function destroy(Project $project)
    {
        //
    }
}
