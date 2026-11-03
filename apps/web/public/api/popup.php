<?php
/**
 * Popup settings API.
 * Stores the current public popup configuration in /api/data/popup.json.
 */
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$dataDir = __DIR__ . '/data';
$dataFile = $dataDir . '/popup.json';
$uploadsDir = __DIR__ . '/uploads';

// Automatically clean up any legacy restrictive .htaccess files that trigger Hostinger 403
if (file_exists($dataDir . '/.htaccess')) {
    @unlink($dataDir . '/.htaccess');
}
if (file_exists($uploadsDir . '/.htaccess')) {
    @unlink($uploadsDir . '/.htaccess');
}

function popupJsonError($status, $message) {
    http_response_code($status);
    echo json_encode(['success' => false, 'error' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    $decoded = json_decode($rawInput, true);

    if (!is_array($decoded) || json_last_error() !== JSON_ERROR_NONE) {
        popupJsonError(400, 'Invalid JSON payload');
    }

    if (!is_dir($dataDir) && !@mkdir($dataDir, 0755, true) && !is_dir($dataDir)) {
        error_log('Popup API: unable to create data directory: ' . $dataDir);
        popupJsonError(500, 'Could not create popup data directory. Check hosting permissions.');
    }

    // Automatically convert any Base64 data URL to a permanent static file in /api/uploads/
    if (!empty($decoded['image_url']) && strpos($decoded['image_url'], 'data:image/') === 0) {
        if (!is_dir($uploadsDir)) {
            @mkdir($uploadsDir, 0755, true);
        }
        $dataUri = $decoded['image_url'];
        preg_match('/^data:image\/(\w+);base64,/', $dataUri, $matches);
        $ext = isset($matches[1]) ? strtolower($matches[1]) : 'jpg';
        if ($ext === 'jpeg') $ext = 'jpg';
        $base64Data = substr($dataUri, strpos($dataUri, ',') + 1);
        $binary = base64_decode(preg_replace('/\s+/', '', $base64Data));
        if ($binary !== false && strlen($binary) > 0) {
            $filename = 'img_popup_' . time() . '_' . substr(md5(uniqid()), 0, 6) . '.' . $ext;
            $savedFile = $uploadsDir . '/' . $filename;
            if (@file_put_contents($savedFile, $binary)) {
                $decoded['image_url'] = '/api/uploads/' . $filename;
            }
        }
    }

    $decoded['updated_at'] = date('c');
    $encoded = json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

    if ($encoded === false) {
        popupJsonError(400, 'Could not encode popup settings as JSON');
    }

    $bytesWritten = @file_put_contents($dataFile, $encoded . PHP_EOL, LOCK_EX);
    if ($bytesWritten === false) {
        error_log('Popup API: unable to write settings file: ' . $dataFile);
        popupJsonError(500, 'Popup settings could not be saved. Check permissions for /api/data/.');
    }

    // Verify the persisted file can be read and decoded before reporting success.
    $savedContent = @file_get_contents($dataFile);
    $savedData = is_string($savedContent) ? json_decode($savedContent, true) : null;
    if (!is_array($savedData) || empty($savedData['image_url'])) {
        error_log('Popup API: settings write verification failed: ' . $dataFile);
        popupJsonError(500, 'Popup settings were written but could not be verified.');
    }

    echo json_encode(['success' => true] + $savedData, JSON_UNESCAPED_SLASHES);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('Allow: GET, POST, OPTIONS');
    popupJsonError(405, 'Method not allowed');
}

if (is_file($dataFile) && is_readable($dataFile)) {
    $content = file_get_contents($dataFile);
    if (is_string($content) && trim($content) !== '') {
        $savedData = json_decode($content, true);
        if (is_array($savedData) && !empty($savedData['image_url'])) {
            echo json_encode($savedData, JSON_UNESCAPED_SLASHES);
            exit;
        }
        error_log('Popup API: saved popup JSON is invalid; using default settings.');
    }
}

echo json_encode([
    'id' => 'main_popup',
    'title' => 'Authentic Vedic Pooja Vidhi & Ritual Information',
    'image_url' => 'https://horizons-cdn.hostinger.com/3ba7c050-6888-4c70-943a-c2caedb2a9c1/1786093528068-GtztxnybZC7umoSY.png?width=768&fit=crop',
    'target_url' => '/authentic-vedic-pooja-dubai',
    'is_enabled' => true,
    'delay_seconds' => 3,
    'updated_at' => date('c')
], JSON_UNESCAPED_SLASHES);
