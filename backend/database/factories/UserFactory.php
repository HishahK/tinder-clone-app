<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Picture;

class UserFactory extends Factory
{
    protected static ?string $password;

    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'age' => fake()->numberBetween(18, 45),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'latitude' => fake()->latitude(37.4, 37.6),
            'longitude' => fake()->longitude(126.8, 127.1),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (User $user) {
            Picture::factory()->count(rand(2, 5))->create(['user_id' => $user->id]);
        });
    }
}