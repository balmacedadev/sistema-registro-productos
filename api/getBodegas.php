<?php
header('Content-Type: application/json');

require_once("../config/database.php");

$stmt = $conn->query("SELECT * FROM bodegas");
$bodegas = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($bodegas);