<?php

namespace App\Controllers;

use App\Models\Lead;
use App\Services\EmailService;

class ContactController extends BaseController
{
    public function submit(): void
    {
        $name = trim($_POST['name'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $phone = trim($_POST['phone'] ?? '');
        $subject = trim($_POST['subject'] ?? '');
        $message = trim($_POST['message'] ?? '');

        if (!$name || !$email || !$message) {
            $this->json(['success' => false, 'error' => 'Name, email, and message are required.'], 400);
            return;
        }

        $leadData = [
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'subject' => $subject,
            'message' => $message,
            'source' => 'contact-form',
            'ipHash' => hash('sha256', $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1'),
        ];

        Lead::create($leadData);
        EmailService::sendLeadNotification($leadData);

        header('Location: ' . \url('/contact?success=1'));
        exit;
    }
}
