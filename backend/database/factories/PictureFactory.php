<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PictureFactory extends Factory
{
    public function definition(): array
    {
        return [
            'url' => 'https://picsum.photos/400/600?random=' . rand(1, 1000),
            'order' => fake()->unique()->numberBetween(1, 5)
        ];
    }
}