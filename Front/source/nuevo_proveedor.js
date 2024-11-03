// let formulario = document.getElementById('formulario');
let codigoProveedor = document.getElementById('codigoProveedor');
let razonSocial = document.getElementById('razonSocial');
let contacto = document.getElementById('contacto');
let numeroCuit = document.getElementById('numeroCuit');
// let numeroDoc = document.getElementById('numeroDoc');
// let telefono = document.getElementById('telefono');
// let email = document.getElementById('email');
// let calle = document.getElementById('calle');
// let numeroDir = document.getElementById('numeroDir');
// let piso = document.getElementById('piso');
// let departamento = document.getElementById('departamento');
// let localidad = document.getElementById('localidad');
// let barrio = document.getElementById('barrio');
// let tipoCliente = document.getElementById('tipoCliente');
// let contenedorErrores = document.getElementById("contenedorErrores");

let botonAceptar = document.getElementById("botonAceptar");
let botonCancelar = document.getElementById("botonCancelar");

botonAceptar.addEventListener("click", validarDatos);
botonCancelar.addEventListener("click", () => {
    location.href = "panel.html";
});


function validarDatos(event) {
    let errores = [];
    event.preventDefault()
    if (nombre.value == "") {
        console.log("nombre vacio")
        errores.push("*Nombre es requerido");
    }
    else if (nombre.value.length > 60) {
        errores.push("*Nombre debe tener como máximo 60 caracteres");
    };

    if (apellido.value.trim() == "") {
        console.log("apellido vacio")
        errores.push("*Apellido es requerido");
    }
    else if (apellido.value.length > 60) {
        errores.push("*Apellido debe tener como máximo 60 caracteres");
    };

    if (tipoDocumento.value == "" || isNaN(tipoDocumento.value)) {
        console.log("tipo de documento vacio")
        errores.push("*Tipo de documento es requerido");
    }

    if (numeroDoc.value == "" || isNaN(numeroDoc.value)) {
        console.log("número documento vacio")
        errores.push("*Número documento es requerido, si desconoce el dato, ingrese 0");
    } 

    if (telefono.value.trim() == "") {
        console.log("teléfono vacio")
        errores.push("*Teléfono es requerido");
    }
    else if (telefono.value.length > 12) {
        errores.push("*Teléfono debe tener como máximo 12 caracteres");
    };

    if (calle.value.trim() == "") {
        console.log("calle vacio")
        errores.push("*Calle es requerido");
    }
    else if (calle.value.length > 60) {
        errores.push("*Calle debe tener como máximo 60 caracteres");
    };

    if (numeroDir.value == "" || isNaN(numeroDir.value)) {
        console.log("número direccion vacio")
        errores.push("*Número en dirección es requerido, si desconoce el dato, ingrese 0");
    }

    if (localidad.value == "" || isNaN(localidad.value)) {
        console.log("localidad vacio")
        errores.push("*Localidad es requerida");
    }
    if (barrio.value == "" || isNaN(barrio.value)) {
        console.log("barrio vacio")
        errores.push("*Barrio es requerido");
    }

    contenedorErrores.innerHTML = "";

    if (errores.length > 0) {

        errores.forEach(function (item, index) {
            parrafo = document.createElement('p');
            contenedorErrores.appendChild(parrafo);
            parrafo.textContent = item;
            parrafo.classList.add("mb-1")
        });
        return
    }

    let selectLocalides = document.getElementById("localidad");

    const cliente = crearObjeto()
    console.log(cliente);

    axios.post('http://localhost:3000/clientes', cliente)
        .then(response => {
            if (response.data.error) {
                alert(response.data.error)
            } else {
                alert(response.data.message)
                location.reload()
            }
        })
        .catch(error => {
            if(error.response.data.error) {
                alert(error.response.data.error)
            } else {
                alert(error.message)
            }
        });
}


function crearObjeto() {
    let contenidoFormulario = {
        nombre: nombre.value,
        apellido: apellido.value,
        telefono: telefono.value,
        calle: calle.value,
        id_barrio: barrio.value,
        id_localidad: localidad.value,
        correo_electronico: email.value,
        id_tipo_cliente: tipoCliente.value,
        id_tipo_documento: tipoDocumento.value,
        numero_documento: numeroDoc.value,
        estado: 1,
        numero_dir: numeroDir.value,
        piso: piso.value == "" ? null:piso.value,
        departamento: departamento.value,
        id_condicion: condicionIVA.value == "" ? 1:condicionIVA.value
    }


    return contenidoFormulario

}