<?php

namespace App\Controllers;

use App\Services\EmailService;

class CareerController extends BaseController
{
    public function index(): void
    {
        $this->render('pages/careers', [
            'meta' => [
                'title' => 'Careers at RGL Decors | Interior Design Jobs Chennai',
                'description' => 'Apply for interior designer, 3D visualiser, and site engineer roles at RGL Decors in Chennai.',
                'canonical_path' => '/careers',
            ],
        ]);
    }

    public function submit(): void
    {
        $name = trim($_POST['name'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $phone = trim($_POST['phone'] ?? '');
        $role = trim($_POST['role'] ?? '');
        $message = trim($_POST['message'] ?? '');

        if (!$name || !$email || !$role) {
            $this->json(['success' => false, 'error' => 'Name, email, and role are required.'], 400);
            return;
        }

        $careerData = [
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'subject' => 'Career Application: ' . $role,
            'message' => "Applied Role: {$role}\n\nNote: {$message}",
            'source' => 'career-page',
        ];

        EmailService::sendLeadNotification($careerData);

        header('Location: ' . \url('/careers?success=1'));
        exit;
    }
}
