<?php

namespace App\Controllers;

use App\Models\Lead;
use App\Services\LookbookData;

class LookbookController extends BaseController
{
    public function submit(): void
    {
        $name = trim($_POST['name'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $phone = trim($_POST['phone'] ?? '');

        if (!$name || !$email) {
            $this->json(['success' => false, 'error' => 'Name and email are required.'], 400);
            return;
        }

        Lead::create([
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'subject' => 'Lookbook Download Request',
            'message' => 'Requested 2026 Interior Lookbook PDF.',
            'source' => 'lookbook-gate',
        ]);

        $lookbook = LookbookData::getLookbook();
        $this->json([
            'success' => true,
            'downloadUrl' => \url($lookbook['downloadUrl']),
        ]);
    }
}
