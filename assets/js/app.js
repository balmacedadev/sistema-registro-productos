// EVENTOS
document.addEventListener("DOMContentLoaded", function() {
    cargarBodegas();
    cargarMonedas();
    cargarMateriales();
});
document.getElementById("bodega").addEventListener("change", function() {
    const bodegaId = this.value;
    cargarSucursales(bodegaId);
});
document.getElementById("formProducto").addEventListener("submit", async function(e) {
    e.preventDefault();

    if (!validarCodigo()) return;
    if (!await validarCodigoUnico()) return;
    if (!validarNombre()) return;
    if (!validarPrecio()) return;
    if (!validarSelect("bodega", "una bodega")) return;
    if (!validarSelect("sucursal", "una sucursal")) return;
    if (!validarSelect("moneda", "una moneda")) return;
    if (!validarMateriales()) return;
    if (!validarDescripcion()) return;

    guardarProducto();
});

// FUNCIONES DE CARGA
function cargarBodegas() {
    fetch("/sistema-registro-productos/api/getBodegas.php")
    .then(response => response.text())
    .then(text => {
        console.log("Texto limpio:", text);

        const data = JSON.parse(text);

        const select = document.getElementById("bodega");

        data.forEach(bodega => {
            const option = document.createElement("option");
            option.value = bodega.id;
            option.textContent = bodega.nombre;
            select.appendChild(option);
        });
    })
    .catch(error => console.error("Error:", error));
}

function cargarSucursales(bodegaId) {

    const selectSucursal = document.getElementById("sucursal");

    // limpiar opciones
    selectSucursal.innerHTML = '<option value="">Seleccione</option>';

    if (!bodegaId) return;

    fetch(`/sistema-registro-productos/api/getSucursales.php?bodega_id=${bodegaId}`)
    .then(response => response.text())
    .then(text => {
        const data = JSON.parse(text);

        data.forEach(sucursal => {
            const option = document.createElement("option");
            option.value = sucursal.id;
            option.textContent = sucursal.nombre;
            selectSucursal.appendChild(option);
        });
    })
    .catch(error => console.error(error));
}

function cargarMonedas() {
    fetch("/sistema-registro-productos/api/getMonedas.php")
    .then(response => response.text())
    .then(text => {
        const data = JSON.parse(text);

        const select = document.getElementById("moneda");

        data.forEach(moneda => {
            const option = document.createElement("option");
            option.value = moneda.id;
            option.textContent = moneda.nombre;
            select.appendChild(option);
        });
    })
    .catch(error => console.error(error));
}
function cargarMateriales() {
    fetch("/sistema-registro-productos/api/getMateriales.php")
    .then(response => response.text())
    .then(text => {
        const data = JSON.parse(text);

        const contenedor = document.getElementById("materiales");

        data.forEach(material => {
            const label = document.createElement("label");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = material.id;
            checkbox.name = "materiales[]";

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(" " + material.nombre));

            contenedor.appendChild(label);
        });
    })
    .catch(error => console.error(error));
}
// FUNCION DE INSERCION
async function guardarProducto() {

    const materialesSeleccionados = Array.from(
        document.querySelectorAll('input[name="materiales[]"]:checked')
    ).map(el => el.value);

    const formData = new FormData();
    formData.append("codigo", document.getElementById("codigo").value);
    formData.append("nombre", document.getElementById("nombre").value);
    formData.append("bodega", document.getElementById("bodega").value);
    formData.append("sucursal", document.getElementById("sucursal").value);
    formData.append("moneda", document.getElementById("moneda").value);
    formData.append("precio", document.getElementById("precio").value);
    formData.append("descripcion", document.getElementById("descripcion").value);

    materialesSeleccionados.forEach(mat => {
        formData.append("materiales[]", mat);
    });

    const response = await fetch("/sistema-registro-productos/api/guardarProducto.php", {
        method: "POST",
        body: formData
    });

    const text = await response.text();
    const data = JSON.parse(text);

    if (data.success) {
        alert("Producto guardado correctamente ✅");
        document.getElementById("formProducto").reset();
    } else {
        alert("Error: " + data.message);
    }
}
// FUNCIONES DE VALIDACION
function validarMateriales() {
    const checkboxes = document.querySelectorAll('input[name="materiales[]"]:checked');

    if (checkboxes.length < 2) {
        alert("Debe seleccionar al menos dos materiales para el producto.");
        return false;
    }

    return true;
}
function validarCodigo() {
    const codigo = document.getElementById("codigo").value.trim();

    // 1. Obligatorio
    if (codigo === "") {
        alert("El código del producto no puede estar en blanco.");
        return false;
    }

    // 2. Longitud
    if (codigo.length < 5 || codigo.length > 15) {
        alert("El código del producto debe tener entre 5 y 15 caracteres.");
        return false;
    }

    // 3. Regex: solo letras y números, al menos una letra y un número
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;

    if (!regex.test(codigo)) {
        alert("El código del producto debe contener letras y números");
        return false;
    }

    return true;
}
async function validarCodigoUnico() {
    const codigo = document.getElementById("codigo").value.trim();

    const response = await fetch(`/sistema-registro-productos/api/validarCodigo.php?codigo=${codigo}`);
    const text = await response.text();
    const data = JSON.parse(text);

    if (data.total > 0) {
        alert("El código del producto ya está registrado.");
        return false;
    }

    return true;
}
function validarPrecio() {
    const precio = document.getElementById("precio").value.trim();

    if (precio === "") {
        alert("El precio no puede estar en blanco.");
        return false;
    }

    const regex = /^\d+(\.\d{1,2})?$/;

    if (!regex.test(precio)) {
        alert("El precio debe ser un número válido (hasta 2 decimales).");
        return false;
    }

    return true;
}
function validarNombre() {
    const nombre = document.getElementById("nombre").value.trim();

    if (nombre === "") {
        alert("El nombre del producto no puede estar en blanco.");
        return false;
    }

    if (nombre.length > 50) {
        alert("El nombre no puede superar los 50 caracteres.");
        return false;
    }

    return true;
}
function validarSelect(id, nombreCampo) {
    const valor = document.getElementById(id).value;

    if (valor === "") {
        alert(`Debe seleccionar ${nombreCampo}.`);
        return false;
    }

    return true;
}
function validarDescripcion() {
    const descripcion = document.getElementById("descripcion").value.trim();

    if (descripcion === "") {
        alert("La descripción no puede estar en blanco.");
        return false;
    }

    if (descripcion.length > 1000) {
        alert("La descripción no puede superar los 1000 caracteres.");
        return false;
    }
    if (descripcion.length < 5) {
        alert("La descripción no puede ser inferior a 5.");
        return false;
    }    

    return true;
}