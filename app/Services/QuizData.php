<?php

namespace App\Services;

class QuizData
{
    public static function getQuestions(): array
    {
        return [
            [
                'id' => 1,
                'question' => 'What type of home are you designing?',
                'options' => [
                    ['label' => 'New 2BHK Apartment', 'style' => 'Modern'],
                    ['label' => 'Spacious 3BHK / Duplex', 'style' => 'Contemporary'],
                    ['label' => 'Independent Villa / House', 'style' => 'Traditional'],
                ],
            ],
            [
                'id' => 2,
                'question' => 'Which visual mood appeals to you most?',
                'options' => [
                    ['label' => 'Warm teak, brass accents & classic wood textures', 'style' => 'Traditional'],
                    ['label' => 'Handleless cabinets, neutral tones & hidden lights', 'style' => 'Modern'],
                    ['label' => 'Fluted panels, marble surfaces & bold contrast', 'style' => 'Contemporary'],
                ],
            ],
            [
                'id' => 3,
                'question' => 'What is your primary kitchen priority?',
                'options' => [
                    ['label' => 'Maximum storage with tall & loft units', 'style' => 'Modern'],
                    ['label' => 'Easy cleaning & humidity resistance', 'style' => 'Contemporary'],
                    ['label' => 'Spacious cooking zone with traditional pooja access', 'style' => 'Traditional'],
                ],
            ],
        ];
    }
}
