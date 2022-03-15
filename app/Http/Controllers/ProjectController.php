<?php

namespace App\Http\Controllers;

use App\Models\Project;
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
        return inertia('Projects/Create');
    }

    public function store(Request $request)
    {
        //
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
