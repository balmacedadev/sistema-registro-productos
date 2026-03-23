<?php
header('Content-Type: application/json');
require_once("../config/database.php");

$stmt = $conn->query("SELECT * FROM monedas");
$monedas = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($monedas);