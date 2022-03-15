<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Project;
use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->isAdmin()->create();
        $user = User::factory()->create();

        Client::factory(30)->has(Project::factory()->for($user))->create();

    }
}
