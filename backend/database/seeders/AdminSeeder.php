<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         $superAdmin = User::create(
            [
                'name' => 'superadmin',
                'email' => 'superadmin@gmail.com',
                'employee_id' => 'ACE-001',
                'password' => Hash::make('superadmin12345'),
                'phone' => '09777666888',
                'status' => '1',
                'team_id' => '1',
            ]
        );

        $admin = User::create(
            [
                'name' => 'admin',
                'email' => 'admin@gmail.com',
                'employee_id' => 'ACE-002',
                'password' => Hash::make('admin12345'),
                'phone' => '09777666887',
                'status' => '1',
                'team_id' => '1',
            ]
        );


        $staff = User::create(
            [
                'name' => 'staff',
                'email' => 'staff@gmail.com',
                'employee_id' => 'ACE-005',
                'password' => Hash::make('user312345'),
                'phone' => '09777666777',
                'status' => '1',
                'team_id' => '2',
            ]
        );

        $superAdmin->assignRole('SuperAdmin');
        $admin->assignRole('Admin');
        $staff->assignRole('Staff');
    }
}
