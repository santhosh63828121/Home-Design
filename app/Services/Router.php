<?php

namespace App\Services;

class Router
{
    protected array $routes = [];
    protected array $middleware = [];

    public function add(string $method, string $path, $handler): self
    {
        // Convert route pattern like /services/{slug} to regex #^/services/([^/]+)$#
        $pattern = preg_replace('#\{([a-zA-Z0-9_]+)\}#', '([^/]+)', $path);
        $pattern = '#^' . $pattern . '$#';

        $this->routes[] = [
            'method' => strtoupper($method),
            'path' => $path,
            'pattern' => $pattern,
            'handler' => $handler,
        ];
        return $this;
    }

    public function get(string $path, $handler): self
    {
        return $this->add('GET', $path, $handler);
    }

    public function post(string $path, $handler): self
    {
        return $this->add('POST', $path, $handler);
    }

    public function addMiddleware(callable $middleware): self
    {
        $this->middleware[] = $middleware;
        return $this;
    }

    public function resolve(?string $method = null, ?string $uri = null): void
    {
        $method = $method ?? $_SERVER['REQUEST_METHOD'] ?? 'GET';
        $uri = $uri ?? $_SERVER['REQUEST_URI'] ?? '/';
        $this->dispatch($method, $uri);
    }

    public function dispatch(string $method, string $uri): void
    {
        // Strip query string
        $uri = parse_url($uri, PHP_URL_PATH) ?? '/';

        // Strip base path prefix (e.g. /Design)
        $prefix = \base_path_prefix();
        if ($prefix && strpos($uri, $prefix) === 0) {
            $uri = substr($uri, strlen($prefix)) ?: '/';
        }

        // Run global middleware
        foreach ($this->middleware as $mw) {
            $res = call_user_func($mw, $method, $uri);
            if ($res === false) {
                return; // middleware halted request
            }
        }

        $method = strtoupper($method);

        foreach ($this->routes as $route) {
            if ($route['method'] === $method && preg_match($route['pattern'], $uri, $matches)) {
                array_shift($matches); // remove full match

                $handler = $route['handler'];

                // Handle string syntax "ControllerClass@actionMethod"
                if (is_string($handler) && strpos($handler, '@') !== false) {
                    [$class, $action] = explode('@', $handler, 2);
                    $controller = new $class();
                    call_user_func_array([$controller, $action], $matches);
                    return;
                }

                if (is_array($handler)) {
                    [$class, $action] = $handler;
                    $controller = new $class();
                    call_user_func_array([$controller, $action], $matches);
                    return;
                }
                
                if (is_callable($handler)) {
                    call_user_func_array($handler, $matches);
                    return;
                }
            }
        }

        // Route not found
        http_response_code(404);
        \render_view('pages/404', [
            'meta' => [
                'title' => 'Page Not Found',
                'description' => 'The page you requested could not be found.',
            ]
        ]);
    }
}
