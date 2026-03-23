<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Formulario de Producto</title>
    <link rel="stylesheet" href="/sistema-registro-productos/assets/css/styles.css">
</head>
<body>

<div class="contenedor">

    <h1>Formulario de Producto</h1>

    <form id="formProducto">

        <!-- FILA 1 -->
        <div class="fila">
            <div class="col">
                <label>Código</label>
                <input type="text" id="codigo">
            </div>

            <div class="col">
                <label>Nombre</label>
                <input type="text" id="nombre">
            </div>
        </div>

        <!-- FILA 2 -->
        <div class="fila">
            <div class="col">
                <label>Bodega</label>
                <select id="bodega">
                    <option value="">Seleccione</option>
                </select>
            </div>

            <div class="col">
                <label>Sucursal</label>
                <select id="sucursal">
                    <option value="">Seleccione</option>
                </select>
            </div>
        </div>

        <!-- FILA 3 -->
        <div class="fila">
            <div class="col">
                <label>Moneda</label>
                <select id="moneda">
                    <option value="">Seleccione</option>
                </select>
            </div>

            <div class="col">
                <label>Precio</label>
                <input type="text" id="precio">
            </div>
        </div>

        <!-- MATERIALES -->
        <div class="bloque">
            <label>Material del Producto</label>
            <div id="materiales"></div>
        </div>

        <!-- DESCRIPCIÓN -->
        <div class="bloque">
            <label>Descripción</label>
            <textarea id="descripcion" rows="4"></textarea>
        </div>

        <!-- BOTÓN -->
        <button type="submit">Guardar Producto</button>

    </form>

</div>

<script src="/sistema-registro-productos/assets/js/app.js"></script>

</body>
</html>

