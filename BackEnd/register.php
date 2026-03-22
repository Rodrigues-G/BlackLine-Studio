<?php
header('Content-Type: application/json');
require 'config.php';

$data = json_decode(file_get_contents('php://input'), true);
$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if (!$name || !$email || !$password) {
    http_response_code(400);
    echo json_encode(['error' => 'Todos os campos são obrigatórios']);
    exit;
}

$config = require 'config.php';
$auth = $config['auth'];
$db = $config['db'];

try {
    $user = $auth->createUserWithEmailAndPassword($email, $password);

    // Guarda dados no Firestore
    $db->collection('users')->document($user->uid)->set([
        'displayName' => $name,
        'email' => $email,
        'createdAt' => new \Google\Cloud\Core\Timestamp(new \DateTime()),
        'profileCompleted' => false,
        'phoneNumber' => '',
        'birthDate' => '',
        'photoURL' => ''
    ]);

    echo json_encode([
        'success' => true,
        'uid' => $user->uid,
        'message' => 'Conta criada com sucesso'
    ]);
} catch (\Kreait\Firebase\Exception\Auth\EmailAlreadyExists $e) {
    http_response_code(409);
    echo json_encode(['error' => 'Email já registado']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao criar conta']);
}