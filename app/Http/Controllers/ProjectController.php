<?php

namespace App\Http\Controllers;

use App\Enums\ProjectStatus;
use App\Models\Client;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;

class ProjectController extends Controller
{
    public function index()
    {
        return inertia(
            'Projects/Index',
            [
                'projects' => Project::select('id', 'user_id', 'client_id', 'title', 'status')
                    ->with(['user:id,name', 'client:id,company'])
                    ->orderBy('created_at', 'desc')
                    ->paginate(10),
                'statuses' => ProjectStatus::cases(),
            ]
        );
    }

    public function create()
    {
        return inertia(
            'Projects/Create',
            [
                'clients' => Client::select('id', 'company')->get(),
                'users' => User::select('id', 'name')->get(),
                'statuses' => ProjectStatus::cases(),
            ]
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'description' => 'required|max:6000',
            'status' => ['required', new Enum(ProjectStatus::class)],
            'client_id' => 'required|exists:clients,id',
            'user_id' => 'required|exists:users,id',
        ]);

        Project::create($validated);

        return redirect()->route('projects.index')->with('success', 'Project saved');
    }

    public function edit(Project $project)
    {
        return inertia(
            'Projects/Edit',
            [
                'project' => $project,
                'clients' => Client::select('id', 'company')->get(),
                'users' => User::select('id', 'name')->get(),
                'statuses' => ProjectStatus::cases(),
            ]
        );
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'max:255',
            'description' => 'max:6000',
            'status' => [new Enum(ProjectStatus::class)],
            'client_id' => 'exists:clients,id',
            'user_id' => 'exists:users,id',
        ]);

        $project->update($validated);

        return redirect()->back()->with('success', 'Project updated');
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()->route('projects.index');
    }
}
