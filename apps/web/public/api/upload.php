<?php
/**
 * Pandit Ji in Dubai - File Upload API for Hostinger
 * Saves uploaded images to /api/uploads/ and returns their public URL.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$uploadDir = __DIR__ . '/uploads/';
if (!is_dir($uploadDir)) {
    @mkdir($uploadDir, 0755, true);
}

// 1. Handle standard multipart file upload ($_FILES['file'])
if (!empty($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $file = $_FILES['file'];
    $tmpPath = $file['tmp_name'];
    $origName = basename($file['name']);
    $ext = strtolower(pathinfo($origName, PATHINFO_EXTENSION));

    $allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    if (!in_array($ext, $allowed, true)) {
        $ext = 'jpg';
    }

    $cleanBase = preg_replace('/[^a-zA-Z0-9_-]/', '_', pathinfo($origName, PATHINFO_FILENAME));
    $cleanBase = substr($cleanBase, 0, 30);
    $filename = 'img_' . time() . '_' . substr(md5(uniqid()), 0, 6) . '.' . $ext;
    $targetPath = $uploadDir . $filename;

    if (move_uploaded_file($tmpPath, $targetPath)) {
        $publicUrl = '/api/uploads/' . $filename;
        echo json_encode([
            'success' => true,
            'url' => $publicUrl,
            'filename' => $filename
        ]);
        exit;
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save uploaded file']);
        exit;
    }
}

// 2. Handle Base64 Data URL JSON payload
$rawInput = file_get_contents('php://input');
if (!empty($rawInput)) {
    $data = json_decode($rawInput, true);
    if (!empty($data['image']) && strpos($data['image'], 'data:image/') === 0) {
        $dataUri = $data['image'];
        preg_match('/^data:image\/(\w+);base64,/', $dataUri, $matches);
        $ext = isset($matches[1]) ? strtolower($matches[1]) : 'jpg';
        if ($ext === 'jpeg') $ext = 'jpg';
        
        $base64Data = substr($dataUri, strpos($dataUri, ',') + 1);
        $decoded = base64_decode($base64Data);

        if ($decoded !== false) {
            $filename = 'img_' . time() . '_' . substr(md5(uniqid()), 0, 6) . '.' . $ext;
            $targetPath = $uploadDir . $filename;
            if (file_put_contents($targetPath, $decoded)) {
                $publicUrl = '/api/uploads/' . $filename;
                echo json_encode([
                    'success' => true,
                    'url' => $publicUrl,
                    'filename' => $filename
                ]);
                exit;
            }
        }
    }
}

http_response_code(400);
echo json_encode(['error' => 'No valid image provided']);

