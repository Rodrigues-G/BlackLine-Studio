<?php
header('Content-Type: application/json');
require 'config.php';

$data = json_decode(file_get_contents('php://input'), true);
$nome = $data['nome'] ?? '';
$email = $data['email'] ?? '';
$mensagem = $data['mensagem'] ?? '';
$dataSessao = $data['data'] ?? '';
$hora = $data['hora'] ?? '';
$uid = $data['uid'] ?? '';

if (!$nome || !$email || !$mensagem || !$dataSessao || !$hora || !$uid) {
    http_response_code(400);
    echo json_encode(['error' => 'Todos os campos são obrigatórios']);
    exit;
}

$config = require 'config.php';
$db = $config['db'];

try {
    $db->collection('bookings')->add([
        'nome' => $nome,
        'email' => $email,
        'mensagem' => $mensagem,
        'data' => $dataSessao,
        'hora' => $hora,
        'userId' => $uid,
        'createdAt' => new \Google\Cloud\Core\Timestamp(new \DateTime()),
        'status' => 'pendente'
    ]);

    echo json_encode(['success' => true, 'message' => 'Marcação enviada com sucesso']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao enviar marcação']);
}