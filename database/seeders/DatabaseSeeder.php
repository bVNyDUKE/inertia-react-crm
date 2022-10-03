<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

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

        if ($user instanceof Model) {
            Client::factory(30)->has(Project::factory()->for($user))->create();
        }
    }
}
