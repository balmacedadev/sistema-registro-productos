<?php
header('Content-Type: application/json');
require_once("../config/database.php");

try {

    $codigo = $_POST['codigo'];
    $nombre = $_POST['nombre'];
    $bodega_id = $_POST['bodega'];
    $sucursal_id = $_POST['sucursal'];
    $moneda_id = $_POST['moneda'];
    $precio = $_POST['precio'];
    $descripcion = $_POST['descripcion'];
    $materiales = $_POST['materiales']; // array

    // 1. Insertar producto
    $stmt = $conn->prepare("
        INSERT INTO productos (codigo, nombre, bodega_id, sucursal_id, moneda_id, precio, descripcion)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        RETURNING id
    ");

    $stmt->execute([
        $codigo,
        $nombre,
        $bodega_id,
        $sucursal_id,
        $moneda_id,
        $precio,
        $descripcion
    ]);

    $producto = $stmt->fetch(PDO::FETCH_ASSOC);
    $producto_id = $producto['id'];

    // 2. Insertar materiales
    $stmtMaterial = $conn->prepare("
        INSERT INTO producto_material (producto_id, material_id)
        VALUES (?, ?)
    ");

    foreach ($materiales as $material_id) {
        $stmtMaterial->execute([$producto_id, $material_id]);
    }

    echo json_encode([
        "success" => true,
        "message" => "Producto guardado correctamente"
    ]);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}