<?php
$host = "localhost";
$port = "5432";
$dbname = "prueba_db";
$user = "postgres";
$password = "123456";

try {
    $conn = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo "Conectado";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>