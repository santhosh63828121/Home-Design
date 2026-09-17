<?php

namespace App\Controllers;

abstract class BaseController
{
    protected function render(string $view, array $data = []): void
    {
        \render_view($view, $data);
    }

    protected function json(array $data, int $status = 200): void
    {
        \json_response($data, $status);
    }
}
