const user = JSON.parse(localStorage.getItem("usuario"));
if (user == null) {
    window.location.href = "index.html";
}else{
    document.querySelector("#usuarioBarra").textContent = user[0];
    if (user[0] != "admin"){
        window.location.href = "tienda.html";
    }
}

document.addEventListener("DOMContentLoaded", function(){
    const formulario = document.querySelector("#formulario");

    const registrarProducto = document.querySelector("#registrarProducto");
    const actualizarProducto = document.querySelector("#actualizarProducto");
    const borrarProducto = document.querySelector("#borrarProducto");

    const listaProductos = document.querySelector("#listaArticulos");
    const mensajeError = document.querySelector("#mensajeError");
    var mensaje = "";

    var arrayProductos = JSON.parse(localStorage.getItem("catalogo")) || [];

    mensajeError.setAttribute("style", "display:none");
    llenarTabla();
    //Registrar un nuevo elemento
    registrarProducto.addEventListener("click", function(){
        registrarDatos();
        llenarTabla();

    });
    //Actualizar un producto de la lista
    actualizarProducto.addEventListener("click", function(){
        actualizarDatos();
        llenarTabla();

    });
    //Borrar un producto de la lista
    borrarProducto.addEventListener("click", function(){
        borrarDatos();
        llenarTabla();
    });

    //Registra un nuevo producto
    function registrarDatos(){
        mensaje = "";
        const id = formulario.idProducto.value;
        const nombre = formulario.nombreProducto.value;
        const precio = formulario.precioProducto.value;
        const imagen = formulario.imagenProducto.value;
        var valido = false;

        if (validarCampos() == true) {
            //Los datos han pasado la validación
            if (existeProducto() == true){
                mensaje = "El articulo ya existe.";
                mensajeError.classList.remove("alert-success");
                mensajeError.classList.add("alert-danger");
            }else {
                //Crea un array con los datos del producto
                const producto = [id, nombre, precio, imagen];
                //Introduce el objeto creado al arrray que muestra lo de memoria
                arrayProductos.push(producto);
                //Con el array actualizado, lo mueve a memoria
                localStorage.setItem("catalogo", JSON.stringify(arrayProductos));
                //Todo salio bien y muestra el mensaje
                mensaje = "Registrado correctamente.";
                mensajeError.classList.remove("alert-danger");
                mensajeError.classList.add("alert-success");
                valido = true;
                limpiarCampos();
            }
        }
        mensajeError.textContent = mensaje;
        mensajeError.setAttribute("style", "display: flex");

        return valido;
    }

    //Actualiza la información de un producto usando su ID
    function actualizarDatos(){
        mensaje = "";
        //Comprueba que los campos esten llenos
        if (validarCampos() == true){
            arrayProductos = JSON.parse(localStorage.getItem("catalogo")) || [];
            const id = formulario.idProducto.value;
            const nombre = formulario.nombreProducto.value;
            const precio = formulario.precioProducto.value;
            const imagen = formulario.imagenProducto.value;
            var existe = false;
            //Recorre el arreglo, item es el objeto e index es la posición
            arrayProductos.forEach((item, index) => {
                if (item[0] === id){
                    //Toma el objeto en la posición index y cambia el atributo correspondiente al segundo numero
                    arrayProductos[index][1] = nombre;
                    arrayProductos[index][2] = precio;
                    arrayProductos[index][3] = imagen;
                    //Guarda los cambios en memoria
                    localStorage.setItem("catalogo", JSON.stringify(arrayProductos));
                    existe = true;
                }
            });
            if (existe == true){
                //Si encontró el producto, muestra mensaje exitoso
                mensaje = "Producto actualizado correctamente.";
                mensajeError.classList.remove("alert-danger");
                mensajeError.classList.add("alert-success");
                limpiarCampos();
            }else {
                //Si no lo encuentra, muestra mensaje de error
                mensaje = "El producto no existe.";
                mensajeError.classList.remove("alert-success");
                mensajeError.classList.add("alert-danger");
            }
        }
        //Muestra el mensaje
        mensajeError.textContent = mensaje;
        mensajeError.setAttribute("style", "display: flex");
    }

    //Borra un dato usando su ID
    function borrarDatos(){
        arrayProductos = JSON.parse(localStorage.getItem("catalogo")) || [];
        const id = formulario.idProducto.value;
        mensaje = "";

        if (id.trim() == ""){
            mensaje += "El ID no puede estar vacío. ";
            mensajeError.classList.remove("alert-success");
            mensajeError.classList.add("alert-danger");
        }else{
            //Si los campos son validos, busca el elemento
            var existe = false;
            var posicion;
            arrayProductos.forEach((item,index) => {
                if (item[0] === id){
                    //Guarda el valor de la posicion y determina si se encontro
                    existe = true;
                    posicion = index;
                }
            });
            if (existe == true){
                //Si existe, entonces corta el arreglo en la posicion del objeto y borra ese elemento
                arrayProductos.splice(posicion, 1);
                //Guarda el resultado en la memoria
                localStorage.setItem("catalogo", JSON.stringify(arrayProductos));
                //Cambia el mensaje
                mensaje = "Producto eliminado correctamente.";
                mensajeError.classList.remove("alert-danger");
                mensajeError.classList.add("alert-success");
                limpiarCampos();
            }else {
                //Si no se encuentra, entonces cambia a mensaje de error
                mensaje += "El producto no existe. ";
                mensajeError.classList.remove("alert-success");
                mensajeError.classList.add("alert-danger");
            }
        }
        //Muestra mensaje
        mensajeError.textContent = mensaje;
        mensajeError.setAttribute("style", "display: flex");
    }

    //Comprueba que exista un producto en memoria usando el ID
    function existeProducto(){
        arrayProductos = JSON.parse(localStorage.getItem("catalogo")) || [];
        const id = formulario.idProducto.value;
        var existe = false;

        arrayProductos.forEach(element => {
            if (element[0] === id){
                existe = true;
            }
        });
        
        return existe;
    }

    //Comprueba que los campos esten llenos
    function validarCampos(){
        var valido = true;
        mensaje = "";
        //Obtiene los datos del formulario
        const id = formulario.idProducto.value;
        const nombre = formulario.nombreProducto.value;
        const precio = formulario.precioProducto.value;
        const imagen = formulario.imagenProducto.value;
        //Valida todos los campos
        if (id.trim() == ""){
            mensaje += "El ID no puede estar vacío. ";
            mensajeError.classList.remove("alert-success");
            mensajeError.classList.add("alert-danger");
            valido = false;
        }
        if (nombre.trim() == ""){
            mensaje += "El nombre no debe estar vacío. ";
            mensajeError.classList.remove("alert-success");
            mensajeError.classList.add("alert-danger");
            valido = false;
        }
        if (precio <= 0 || !isNaN(precioProducto)){
            mensaje += "El precio debe ser mayor a 0. ";
            mensajeError.classList.remove("alert-success");
            mensajeError.classList.add("alert-danger");
            valido = false;
        }
        if (imagen == ""){
            mensaje += "Se debe introducir un URL para la imágen.";
            mensajeError.classList.remove("alert-success");
            mensajeError.classList.add("alert-danger");
            valido = false;
        }
        //Si todos son validos, regresa true, sino regresa false
        return valido;
    }

    //Recorre la memoria y agrega los elementos a la tabla
    function llenarTabla(){
        listaProductos.innerHTML = "";
        arrayProductos.forEach(lista => {
            const renglon = document.createElement("tr");
            renglon.innerHTML = `
            <td>${lista[0]}</td>
            <td>${lista[1]}</td>
            <td>$${lista[2]}</td>
            <td><img src="${lista[3]}" class="imgAdm"></td>
            `;
            listaProductos.appendChild(renglon);
        });
    }

    function limpiarCampos(){
        formulario.reset();
    }
});