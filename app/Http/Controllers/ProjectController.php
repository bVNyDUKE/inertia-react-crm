<?php

namespace App\Http\Controllers;

use App\Enums\ProjectStatus;
use App\Models\Client;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render(
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

    public function create(): \Inertia\Response
    {
        return Inertia::render(
            'Projects/Create',
            [
                'clients' => Client::select('id', 'company')->get(),
                'users' => User::select('id', 'name')->get(),
                'statuses' => ProjectStatus::cases(),
            ]
        );
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
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

    public function edit(Project $project): \Inertia\Response
    {
        return Inertia::render(
            'Projects/Edit',
            [
                'project' => $project,
                'clients' => Client::select('id', 'company')->get(),
                'users' => User::select('id', 'name')->get(),
                'statuses' => ProjectStatus::cases(),
            ]
        );
    }

    public function update(Request $request, Project $project): \Illuminate\Http\RedirectResponse
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

    public function destroy(Project $project): \Illuminate\Http\RedirectResponse
    {
        $project->delete();

        return redirect()->route('projects.index');
    }
}
