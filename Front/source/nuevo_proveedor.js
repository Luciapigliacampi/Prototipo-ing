// Obtener los elementos del formulario
let codigoProveedor = document.getElementById('codigoProveedor');
let razonSocial = document.getElementById('razonSocial');
let contacto = document.getElementById('contacto');
let numeroCuit = document.getElementById('numeroCuit');
let direccion = document.getElementById('direccion');
let telefono = document.getElementById('telefono');
let email = document.getElementById('email');
let localidad = document.getElementById('localidad');

let botonAceptar = document.getElementById("botonAceptar");
let botonCancelar = document.getElementById("botonCancelar");

// Event listener para el botón Aceptar
botonAceptar.addEventListener("click", validarDatos);

// Función de validación de datos
function validarDatos(event) {
    event.preventDefault();
    let errores = [];

    // Validaciones básicas
    if (codigoProveedor.value == "" || isNaN(codigoProveedor.value)) errores.push("*Código de proveedor es requerido");
    if (razonSocial.value.trim() == "") errores.push("*Razón social es requerido");
    if (contacto.value.trim() == "") errores.push("*Contacto es requerido");
    if (numeroCuit.value == "" || isNaN(numeroCuit.value)) errores.push("*Número de CUIT es requerido");
    if (direccion.value.trim() == "") errores.push("*Dirección es requerido");
    if (telefono.value.trim() == "") errores.push("*Teléfono es requerido");
    if (localidad.value == "Localidad") errores.push("*Localidad es requerida");

    contenedorErrores.innerHTML = "";

    // Mostrar errores en el contenedor si hay alguno
    if (errores.length > 0) {
        errores.forEach(item => {
            let parrafo = document.createElement('p');
            parrafo.textContent = item;
            parrafo.classList.add("mb-1");
            contenedorErrores.appendChild(parrafo);
        });
        return;
    }

    // Verificación del CUIT
    if (numeroCuit.value === "27380219218") {
        Swal.fire({
            icon: 'error',
            title: 'Proveedor existente',
            text: 'El proveedor ya existe.',
            confirmButtonText: 'Cerrar'
        });
        return;
    }

    // Confirmación de registro
    Swal.fire({
        title: '¿Desea registrar el nuevo proveedor?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Proveedor registrado con éxito',
                confirmButtonText: 'Aceptar'
            });
        }
    });
}

// Event listener para el botón Cancelar
botonCancelar.addEventListener("click", () => {
    location.href = "panel.html";
});