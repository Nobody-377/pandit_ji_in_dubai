<?php
/**
 * Pandit Ji in Dubai - Pop-Up Notification Settings API for Hostinger
 * Persists promotional pop-up banner settings to /api/data/popup.json
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
$dataFile = $dataDir . 'popup.json';

// Handle POST: Update pop-up settings
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    if (!empty($rawInput)) {
        $decoded = json_decode($rawInput, true);
        if ($decoded !== null && is_array($decoded)) {
            $decoded['updated_at'] = date('c');
            file_put_contents($dataFile, json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
            echo json_encode($decoded);
            exit;
        }
    }
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON payload']);
    exit;
}

// Handle GET: Return pop-up settings
if (file_exists($dataFile)) {
    $content = file_get_contents($dataFile);
    if (!empty($content)) {
        echo $content;
        exit;
    }
}

// Default fallback
echo json_encode([
    'id' => 'default_promo_popup',
    'title' => 'Authentic Vedic Pooja Vidhi & Ritual Information',
    'image_url' => 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/1786093528068-GtztxnybZC7umoSY.png?width=768&fit=crop',
    'target_url' => '/authentic-vedic-pooja-dubai',
    'is_enabled' => true,
    'delay_seconds' => 3,
    'updated_at' => date('c')
]);

