<?php
header('Content-Type: application/json');
require_once("../config/database.php");

$bodega_id = $_GET['bodega_id'];

$stmt = $conn->prepare("SELECT * FROM sucursales WHERE bodega_id = ?");
$stmt->execute([$bodega_id]);

$sucursales = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($sucursales);