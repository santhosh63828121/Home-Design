<?php

namespace App\Controllers;

use App\Models\Lead;
use App\Services\EmailService;
use App\Services\BusinessData;

class LeadController extends BaseController
{
    public function submit(): void
    {
        $name = trim($_POST['name'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $phone = trim($_POST['phone'] ?? '');
        $city = trim($_POST['city'] ?? '');
        $homeType = trim($_POST['homeType'] ?? '');
        $budget = trim($_POST['budget'] ?? '');
        $message = trim($_POST['message'] ?? '');
        $source = trim($_POST['source'] ?? 'website');

        if (!$name || !$email) {
            $this->json(['success' => false, 'error' => 'Name and email are required.'], 400);
            return;
        }

        $leadData = [
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'city' => $city,
            'homeType' => $homeType,
            'budget' => $budget,
            'message' => $message,
            'source' => $source,
            'ipHash' => hash('sha256', $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1'),
        ];

        $leadId = Lead::create($leadData);
        EmailService::sendLeadNotification($leadData);

        // Generate WhatsApp deep link
        $waMsg = "Hi RGL Decors, I'm {$name}. I just submitted a quote request for {$homeType} in {$city}.";
        $waLink = BusinessData::whatsappLink($waMsg);

        if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'XMLHttpRequest') {
            $this->json([
                'success' => true,
                'leadId' => $leadId,
                'whatsappUrl' => $waLink,
                'message' => 'Thank you! Your quote request has been received.',
            ]);
        } else {
            header('Location: ' . \url('/contact?submitted=1'));
            exit;
        }
    }
}
