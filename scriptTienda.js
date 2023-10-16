const user = JSON.parse(localStorage.getItem("usuario"));
if (user == null) {
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function(){
    //Determinar si es admin o usuario y evitar que entre a catalogo
    const catalogo = document.querySelector("#catalogo");

    if (user[0] == "user"){
        catalogo.setAttribute("style", "display: none");
    }else if (user[0]=="admin"){
        catalogo.setAttribute("style", "display: flex");
    }
    //Se construye la lista de productos
    const catalogoArray = [];
    
    //Agrega los elementos de memoria al catalogo
    const arrayProductos = JSON.parse(localStorage.getItem("catalogo")) || [];
    arrayProductos.forEach(item => {
        const nuevo = {id: item[0], imagen: item[3], precio: item[2], nombre: item[1]};
        catalogoArray.push(nuevo);
    });
    //Recupera, en orden, el contenedor de las cartas de los productos, la lista de compra y el texto del total
    const catalogoContainer = document.getElementById("catalogoCard");
    const resumenCompra = document.getElementById("resumenCompra");
    const total = document.getElementById("total");
    construirCatalogo();


    function construirCatalogo(){
          // Genera las tarjetas de productos en el catálogo
    catalogoArray.forEach((producto) => {
        //Crea un contenedor de codigo
        const card = document.createElement("div");
        //Le añade las clases col-md-4 y mb-4 para agregar margen y organización en forma de tabla
        card.classList.add("col-md-4", "mb-4");
        //Dentro del bloque de código agrega lo necesario para ingresar cada carta del catálogo
        card.innerHTML = `
            <div class="card text-dark rounded">
                <img src="${producto.imagen}" class="card-img-top imgArticulo" alt="Producto ${producto.id}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Precio: $${producto.precio}
                    <br>
                    Cantidad: <input type="number" class="cantidad" id="cantidadProducto${producto.id}">
                    <br><br>
                    </p>
                    <button type="button" class="btn btn-primary agregar"> Agregar al Carrito </button>
                </div>
            </div>
                
            
        `;
        catalogoContainer.appendChild(card);

        // Agrega un evento de clic al botón de "Agregar al Carrito"
        const botonAgregar = card.querySelector("button");
        botonAgregar.addEventListener("click", function () {
            const cantidad = parseInt(document.getElementById(`cantidadProducto${producto.id}`).value);

            if (cantidad > 0) {
                agregarProductoAlCarrito(producto, cantidad);
            }
        });
    });
    }


    const carrito = [];

    function agregarProductoAlCarrito(producto, cantidad) {
        // Busca si el producto ya está en el carrito
        const productoEnCarrito = carrito.find((item) => item.producto.id === producto.id);

        if (productoEnCarrito) {
            // Si ya está en el carrito, actualiza la cantidad
            productoEnCarrito.cantidad += cantidad;
        } else {
            // Si no está en el carrito, agrega un nuevo elemento al carrito
            carrito.push({ producto, cantidad });
        }

        // Actualiza el resumen de la compra
        actualizarResumenCompra();
    }

    function actualizarResumenCompra() {
        // Limpia el resumen de compra
        resumenCompra.innerHTML = "";
        let subtotalTotal = 0;

        carrito.forEach((item) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${item.producto.nombre}</td>
                <td>${item.cantidad}</td>
                <td>${item.producto.precio * item.cantidad}</td>
            `;
            resumenCompra.appendChild(fila);

            subtotalTotal += item.producto.precio * item.cantidad;
        });

        // Actualiza el total
        total.textContent = `$${subtotalTotal}`;
    }

    const finalizarCompra = document.querySelector("#finalizarCompra");
    finalizarCompra.addEventListener("click", function() {
        //Al finalizar la compra
        /*Pasar los datos a la memoria local*/
        /*Crea un contenedor vacio para almacenar los datos del ticket */
        const arregloEnvio = [];
        /*Crea las variables que contendra el objeto*/
        var idArt, nombreArt, precioArt, cantidadArt;
        /*Por cada elemento del carrito recolecta los datos del producto y guardar en objeto*/
        carrito.forEach(element => {
           idArt = element.producto.id;
           nombreArt = element.producto.nombre;
           precioArt = element.producto.precio;
           cantidadArt = element.cantidad;
           /*Crea el objeto con los datos del producto*/
           const envio = {idArt, nombreArt, precioArt, cantidadArt};
           /*Guarda el objeto en el arreglo*/
           arregloEnvio.push(envio);
        });
        /*Mandar el arreglo creado a la memoria local*/
        localStorage.setItem("arregloEnvio", JSON.stringify(arregloEnvio));

        //Borra el carrito
        carrito.length = 0;
        //Actualiza la lista de compra, borrandola
        actualizarResumenCompra();

        //Abrir ticket
        window.location.href = "ticket.html";
    });

    const displayCalculator = document.querySelector("#btncalculadora");
    const calculadora = document.querySelector(".calculator");
    calculadora.setAttribute("style", "display:none");

    displayCalculator.addEventListener("click", function(){
        if (calculadora.getAttribute("style") == "display:none"){
            calculadora.setAttribute("style", "display:flex");
            return;
        }
        if (calculadora.getAttribute("style") == "display:flex"){
            calculadora.setAttribute("style", "display:none");
            return;
        }
        
    });

    //Codigo de calculadora
    const display = document.querySelector(".display");
    const buttons = document.querySelectorAll("button");
    
    let currentInput = "";
    let currentOperator = "";
    let shouldClearDisplay = false;
    
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const buttonText = button.textContent;
    
            if (buttonText.match(/[0-9]/)) {
                if (shouldClearDisplay) {
                    display.textContent = "";
                    shouldClearDisplay = false;
                }
                display.textContent += buttonText;
            } else if (buttonText === "C") {
                display.textContent = "";
                currentInput = "";
                currentOperator = "";
            } else if (buttonText === "=") {
                if (currentOperator && currentInput) {
                    const result = calculate(parseFloat(currentInput), currentOperator, parseFloat(display.textContent));
                    display.textContent = result;
                    currentInput = result;
                    currentOperator = "";
                    shouldClearDisplay = true;
                }
            } else {
                currentOperator = buttonText;
                currentInput = display.textContent;
                shouldClearDisplay = true;
            }
        });
    });
    
    function calculate(num1, operator, num2) {
        switch (operator) {
            case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            if (num2 !== 0) {
                return num1 / num2;
            } else {
                return "Error";
            }
        default:
            return num2;
    }
    }


});

/*lucas, bubalob mix, gomitas gusanito con y sin chamoy, panditas con y sin chamoy, dibujos para pintar*/