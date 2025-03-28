<?php

namespace Database\Factories;

use App\Models\Feedback;  // Ensure this is correct
use Illuminate\Database\Eloquent\Factories\Factory;

class FeedbackFactory extends Factory
{
    protected $model = Feedback::class; // Make sure this is correct

    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'phone' => $this->faker->phoneNumber,
            'feedback' => $this->faker->text,
        ];
    }
}
