<?php
/**
 * Pandit Ji in Dubai - Pooja Services Catalog API for Hostinger
 * Persists pooja services to /api/data/services.json
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataDir = __DIR__ . '/data/';
if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0755, true);
}
if (file_exists($dataDir . '.htaccess')) {
    @unlink($dataDir . '.htaccess');
}
$dataFile = $dataDir . 'services.json';

// Handle POST: Update services
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    if (!empty($rawInput)) {
        $decoded = json_decode($rawInput, true);
        if ($decoded !== null && is_array($decoded)) {
            file_put_contents($dataFile, json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
            echo json_encode($decoded);
            exit;
        }
    }
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON payload']);
    exit;
}

// Handle GET: Return services
if (file_exists($dataFile)) {
    $content = file_get_contents($dataFile);
    if (!empty($content)) {
        echo $content;
        exit;
    }
}

// Return null if no custom services saved yet
echo json_encode(null);

