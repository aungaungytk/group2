<?php

namespace Database\Seeders;

use App\Models\Team;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call([
            RoleAndPermissionSeeder::class,
        ]);

        $this->call(AdminSeeder::class);

        $team1 = Team::create(
            [
                'name' => 'Team1',
                // 'user_id' => '1',
            ]
        );
        $team2 = Team::create(
            [
                'name' => 'Team2',
                // 'user_id' => '2',

            ]
        );
        $team3 = Team::create(
            [
                'name' => 'Team3',
                // 'user_id' => '3',

            ]
        );
        $team4 = Team::create(
            [
                'name' => 'Team1',
                // 'user_id' => '1',
            ]
        );
        $team5 = Team::create(
            [
                'name' => 'Team2',
                // 'user_id' => '2',

            ]
        );
        $team6 = Team::create(
            [
                'name' => 'Team3',
                // 'user_id' => '3',

            ]
        );
        $team7 = Team::create(
            [
                'name' => 'Team1',
                // 'user_id' => '1',
            ]
        );
        $team8 = Team::create(
            [
                'name' => 'Team2',
                // 'user_id' => '2',

            ]
        );
        $team9 = Team::create(
            [
                'name' => 'Team3',
                // 'user_id' => '3',

            ]
        );
        $team10 = Team::create(
            [
                'name' => 'Team1',
                // 'user_id' => '1',
            ]
        );
        $team11 = Team::create(
            [
                'name' => 'Team2',
                // 'user_id' => '2',

            ]
        );
        $team12 = Team::create(
            [
                'name' => 'Team3',
                // 'user_id' => '3',

            ]
        );

    }
}
