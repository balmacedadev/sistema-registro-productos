<?php
header('Content-Type: application/json');
require_once("../config/database.php");

$codigo = $_GET['codigo'];

$stmt = $conn->prepare("SELECT COUNT(*) as total FROM productos WHERE codigo = ?");
$stmt->execute([$codigo]);

$resultado = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($resultado);