<?php
header('Content-Type: application/json');
require 'config.php';

$data = json_decode(file_get_contents('php://input'), true);
$uid = $data['uid'] ?? '';
$name = $data['name'] ?? '';
$phone = $data['phone'] ?? '';
$birthdate = $data['birthdate'] ?? '';

if (!$uid) {
    http_response_code(400);
    echo json_encode(['error' => 'Utilizador não identificado']);
    exit;
}

$config = require 'config.php';
$db = $config['db'];

try {
    $db->collection('users')->document($uid)->update([
        ['path' => 'displayName', 'value' => $name],
        ['path' => 'phoneNumber', 'value' => $phone],
        ['path' => 'birthDate', 'value' => $birthdate],
        ['path' => 'profileCompleted', 'value' => true]
    ]);

    echo json_encode(['success' => true, 'message' => 'Perfil atualizado']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao atualizar perfil']);
}