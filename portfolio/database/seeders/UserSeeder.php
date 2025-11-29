<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        if (User::count() === 0) {
            User::create([
                'name' => 'Admin',
                'email' => 'jorge.gonzalez.fuentes.dev@gmail.com',
                'password' => Hash::make('10.de.Mayo.del.2000'),
            ]);
        }
    }
}
