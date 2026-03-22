<?php
require_once __DIR__ . '/vendor/autoload.php';

use Kreait\Firebase\Factory;

$factory = (new Factory)
    ->withServiceAccount(__DIR__ . '/firebase-adminsdk.json');  // coloca aqui o teu ficheiro JSON do Firebase

$auth = $factory->createAuth();
$db = $factory->createFirestore()->database();
$storage = $factory->createStorage();

return [
  'auth' => $auth,
  'db' => $db,
  'storage' => $storage
];