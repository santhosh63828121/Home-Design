<?php

namespace App\Services;

class EmailService
{
    public static function sendLeadNotification(array $leadData): bool
    {
        $config = include __DIR__ . '/../../config/mail.php';
        $to = $config['recipient_email'];
        $subject = "New Lead Captured: " . ($leadData['name'] ?? 'Website Inquiry');

        $body = "New Lead Details:\n\n";
        $body .= "Name: " . ($leadData['name'] ?? 'N/A') . "\n";
        $body .= "Email: " . ($leadData['email'] ?? 'N/A') . "\n";
        $body .= "Phone: " . ($leadData['phone'] ?? 'N/A') . "\n";
        $body .= "City: " . ($leadData['city'] ?? 'N/A') . "\n";
        $body .= "Home Type: " . ($leadData['homeType'] ?? 'N/A') . "\n";
        $body .= "Budget: " . ($leadData['budget'] ?? 'N/A') . "\n";
        $body .= "Source: " . ($leadData['source'] ?? 'website') . "\n";
        $body .= "Message: " . ($leadData['message'] ?? 'N/A') . "\n";

        $headers = "From: " . $config['from_name'] . " <" . $config['from_address'] . ">\r\n";
        $headers .= "Reply-To: " . ($leadData['email'] ?? $config['from_address']) . "\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();

        // Native mail dispatch (or PHPMailer if configured)
        return @mail($to, $subject, $body, $headers);
    }
}
