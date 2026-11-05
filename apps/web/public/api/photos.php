<?php
/**
 * Pandit Ji in Dubai - Section Photos API for Hostinger
 * Persists landing page section photos to /api/data/photos.json
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
$dataFile = $dataDir . 'photos.json';

$allPhotos = [];
if (file_exists($dataFile)) {
    $raw = file_get_contents($dataFile);
    if (!empty($raw)) {
        $parsed = json_decode($raw, true);
        if (is_array($parsed)) {
            $allPhotos = $parsed;
        }
    }
}

// Handle POST: Save / update photos for a pageId & sectionId
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    if (!empty($rawInput)) {
        $payload = json_decode($rawInput, true);
        if ($payload !== null && isset($payload['pageId'], $payload['sectionId'])) {
            $key = $payload['pageId'] . '::' . $payload['sectionId'];

            // Handle Restore to Defaults / Delete Section Override
            if ((isset($payload['action']) && in_array($payload['action'], ['restore', 'delete'], true)) || (isset($payload['photos']) && empty($payload['photos']))) {
                if (isset($allPhotos[$key])) {
                    unset($allPhotos[$key]);
                    file_put_contents($dataFile, json_encode($allPhotos, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
                }
                echo json_encode(['success' => true, 'restored' => true]);
                exit;
            }

            if (isset($payload['photos']) && is_array($payload['photos'])) {
                $allPhotos[$key] = $payload['photos'];
                file_put_contents($dataFile, json_encode($allPhotos, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
                echo json_encode(['success' => true, 'photos' => $payload['photos']]);
                exit;
            }
        }
    }
    http_response_code(400);
    echo json_encode(['error' => 'Invalid payload format']);
    exit;
}

// Handle GET: Retrieve photos
$pageId = isset($_GET['pageId']) ? trim($_GET['pageId']) : '';
$sectionId = isset($_GET['sectionId']) ? trim($_GET['sectionId']) : '';

if (!empty($pageId) && !empty($sectionId)) {
    $key = $pageId . '::' . $sectionId;
    if (isset($allPhotos[$key])) {
        echo json_encode($allPhotos[$key]);
        exit;
    }
    echo json_encode(null);
    exit;
}

echo json_encode($allPhotos);

