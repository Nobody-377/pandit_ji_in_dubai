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

function isPhotoBanned($p) {
    if (!is_array($p)) return false;
    $src = isset($p['src']) ? strtolower($p['src']) : '';
    $title = isset($p['title']) ? strtolower($p['title']) : '';
    $alt = isset($p['alt']) ? strtolower($p['alt']) : '';
    if (strpos($title, 'lakshmi pooja') !== false || strpos($alt, 'lakshmi pooja') !== false) return true;
    if (strpos($title, 'ganesh pooja') !== false || strpos($alt, 'ganesh pooja') !== false) return true;
    if (strpos($src, 'amenities') !== false || strpos($src, 'bjsvd5') !== false) return true;
    return false;
}

// Clean any banned photos from all loaded data
foreach ($allPhotos as $k => $photosList) {
    if (is_array($photosList)) {
        $allPhotos[$k] = array_values(array_filter($photosList, function($p) {
            return !isPhotoBanned($p);
        }));
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
                $clean = array_values(array_filter($payload['photos'], function($p) {
                    return !isPhotoBanned($p);
                }));
                $allPhotos[$key] = $clean;
                file_put_contents($dataFile, json_encode($allPhotos, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
                echo json_encode(['success' => true, 'photos' => $clean]);
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
    if (isset($allPhotos[$key]) && is_array($allPhotos[$key])) {
        $clean = array_values(array_filter($allPhotos[$key], function($p) {
            return !isPhotoBanned($p);
        }));
        echo json_encode($clean);
        exit;
    }
    echo json_encode(null);
    exit;
}

echo json_encode($allPhotos);

