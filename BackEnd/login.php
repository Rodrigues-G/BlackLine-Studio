<?php
header('Content-Type: application/json');
require 'config.php';

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

$config = require 'config.php';
$auth = $config['auth'];

try {
  $result = $auth->signInWithEmailAndPassword($email, $password);
  echo json_encode(['success' => true, 'uid' => $result->firebaseUserId()]);
} catch (Exception $e) {
  echo json_encode(['success' => false, 'error' => 'Credenciais inválidas']);
}