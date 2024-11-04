const clientes = [
    {
        nombre: "Lucia Pigliacampi",
        documento: 38021921,
        descuento: 10
    },
    {
        nombre: "Jose Sosa",
        documento: 35638284,
        descuento: 15
    },
    {
        nombre: "Enrique Iglesias",
        documento: 14655938,
        descuento: 4
    },
    {
        nombre: "Emiliano Martinez",
        documento: 13136121,
        descuento: 5
    },
    {
        nombre: "Luis Miguel",
        documento: 41411191,
        descuento: 9
    },
    {
        nombre: "Alberto Pérez",
        documento: 43604611,
        descuento: 35
    },
]

const dniCliente = document.getElementById("dniCliente")
const datosCliente = document.getElementById("datosCliente")
const valorDescuento = document.getElementById("valorDescuento")
const totalDescuento = document.getElementById("totalDescuento")

let timeoutBusqueda;
dniCliente.addEventListener('input', (event) => {
    event.preventDefault();
    datosCliente.value = ""
    valorDescuento.value = ""
    listaProductos.disabled = true
    clearTimeout(timeoutBusqueda); // Cancelar el temporizador anterior
    if (dniCliente.value != "") {
        timeoutBusqueda = setTimeout(() => {
            const resultado = clientes.find(cliente => cliente.documento === parseInt(dniCliente.value));

            if (resultado) {
                datosCliente.value = `${resultado.documento} - ${resultado.nombre}`
                valorDescuento.value = `${resultado.descuento}%`
                totalDescuento.textContent = `${resultado.descuento}`
                listaProductos.disabled = false
            } else {


                if (confirm("No se encontro el cliente, ¿Desea registrarlo?")) {
                    alert("Llamado al CU registrar cliente")
                }
            }
        }, 800);
    }
})

{/* <option value="">Seleccione un producto</option>
                        <option value="">Líquido Refrigerante</option>
                        <option value="">Agua Destilada</option>
                        <option value="">Radiador Gol Power AB9/G3/G4</option>
                        <option value="">Lámpara H4 Bosch</option>
                        <option value="">Lámpara H7 Bosch</option> */}


const productos = [
    {
        codigo: "A0001",
        nombre: "Líquido Refrigerante",
        precio: 1500.00
    },
    {
        codigo: "A0002",
        nombre: "Agua Destilada",
        precio: 1000.00
    },
    {
        codigo: "B0024",
        nombre: "Radiador Gol Power AB9/G3/G4",
        precio: 95000.00
    },
    {
        codigo: "C0235",
        nombre: "Lámpara H4 Bosch",
        precio: 3500.00
    },
    {
        codigo: "C0201",
        nombre: "Lámpara H7 Bosch",
        precio: 3800.00
    }
]


const listaProductos = document.getElementById("listaProductos")

let pedido = []

listaProductos.addEventListener('change', (event) => {
    event.preventDefault();

    if (listaProductos.value != "") {
        let productoSeleccionado = productos.find(producto => {
            return producto.codigo === listaProductos.value
        })

        const tableRow = document.createElement('tr');
        tableRow.id = `producto-${productoSeleccionado.codigo}`

        const datoCodigo = document.createElement('td');
        datoCodigo.textContent = productoSeleccionado.codigo;

        const datoProducto = document.createElement('td');
        datoProducto.textContent = productoSeleccionado.nombre;

        const datoCantidad = document.createElement('td');
        const inputCantidad = document.createElement('input')
        inputCantidad.id = `cantidad-${productoSeleccionado.codigo}`
        inputCantidad.style.width = '90px';
        inputCantidad.classList.add("form-control")
        inputCantidad.type = "number"
        inputCantidad.min = 0
        inputCantidad.value = 0

        const datoTotalProducto = document.createElement('td');
        datoTotalProducto.classList.add("subtotalProductos")

        inputCantidad.addEventListener('change', (event) => {
            event.preventDefault()

            let importeTotal = (parseFloat(inputCantidad.value) * productoSeleccionado.precio).toFixed(2)

            datoTotalProducto.textContent = importeTotal
            calcularTotalPedido();
        })

        datoCantidad.appendChild(inputCantidad)

        // aqui inout para cantidad

        const datoValorUnitario = document.createElement('td');

        datoValorUnitario.textContent = productoSeleccionado.precio;



        const datoAcciones = document.createElement('td');
        let botonQuitar = document.createElement('button');
        botonQuitar.classList.add('btn', 'btn-sm', 'ms-2', 'me-2');
        botonQuitar.innerHTML = '<i class="fas fa-trash text-danger"></i>'

        datoAcciones.appendChild(botonQuitar)


        botonQuitar.addEventListener('click', function (event) {
            const fila = document.getElementById(`producto-${productoSeleccionado.codigo}`); // Obtiene el <tr> por su id

            if (fila) {
                fila.remove();
                calcularTotalPedido()
            } else {
                console.log('La fila no existe.');
            }
        })

        tableRow.appendChild(datoCodigo)
        tableRow.appendChild(datoProducto)
        tableRow.appendChild(datoCantidad)
        tableRow.appendChild(datoValorUnitario)
        tableRow.appendChild(datoTotalProducto)
        tableRow.appendChild(datoAcciones)

        bodyProductosPedido.appendChild(tableRow)

        listaProductos.value = ""
    }

    const subtotalMonto = document.getElementById("subtotalMonto")
    const ivaMonto = document.getElementById("ivaMonto")
    const totalMonto = document.getElementById("totalMonto")
    const descuentoMonto = document.getElementById("descuentoMonto")

    function calcularTotalPedido() {
        const subtotalesProductos = document.querySelectorAll(".subtotalProductos")

        let subtotal = 0;
        let porcentajeDescuento = 0;
        let descuento = 0;
        let total = 0;
        console.log();

        if (subtotalesProductos.length > 0) {
            subtotalesProductos.forEach(celda => {
                subtotal += parseFloat(celda.textContent) * 1.21
                subtotalMonto.textContent = subtotal.toFixed(2)
                porcentajeDescuento = parseFloat(valorDescuento.value) / 100
                descuento = (subtotal * porcentajeDescuento)
                descuentoMonto.textContent = descuento
                total = subtotal - descuento
                totalMonto.textContent = total.toFixed(2)
            });
        } else {
            subtotalMonto.textContent = "0.00"
            descuentoMonto.textContent = "0.00"
            totalMonto.textContent = "0.00"
        }
    }
})

const formPedido = document.getElementById("formPedido")
formPedido.addEventListener('submit', (event) => {
    event.preventDefault();

    const totalMonto = document.getElementById("totalMonto")

    const productosAgregados = document.getElementById("bodyProductosPedido").querySelectorAll("tr")
    if(productosAgregados.length > 0 && parseInt(totalMonto.textContent) > 0)  {
        Swal.fire({
            title: "¿Desea confirmar el pedido?",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: `Cancelar`
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Pedido registrado con éxito",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Imprimir PDF",
                    cancelButtonText: "Exportar PDF",
                    denyButtonText: `Enviar PDF vía Email`
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire("Imprimiendo pdf", "", "info");
                        return
                    } else if (result.isDenied) {
                        Swal.fire("Enviando pdf", "", "info");
                        return
                    } 
                    Swal.fire("Exportando pdf", "", "info");
                });
            }
        });
       
    } else {
        alert("Debe agregar productos")
    }
    
    
})
// 