<?php
header('Content-Type: application/json');
require 'config.php';

$data = json_decode(file_get_contents('php://input'), true);
$nome = $data['nome'] ?? '';
$email = $data['email'] ?? '';
$mensagem = $data['mensagem'] ?? '';

if (!$nome || !$email || !$mensagem) {
    http_response_code(400);
    echo json_encode(['error' => 'Todos os campos são obrigatórios']);
    exit;
}

$config = require 'config.php';
$db = $config['db'];

try {
    $db->collection('contacts')->add([
        'nome' => $nome,
        'email' => $email,
        'mensagem' => $mensagem,
        'createdAt' => new \Google\Cloud\Core\Timestamp(new \DateTime()),
        'status' => 'novo'
    ]);

    echo json_encode(['success' => true, 'message' => 'Mensagem enviada com sucesso']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao enviar contacto']);
}