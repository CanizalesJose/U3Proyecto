document.addEventListener("DOMContentLoaded", function(){
    localStorage.removeItem("usuario");
    
    const boton = document.querySelector("#botonLogin");

    boton.addEventListener("click", function(){
        
        //Leer los valores de los campos
        const nombre = document.querySelector("#nombreUsuario").value;
        const password = document.querySelector("#passwordUsuario").value;

        if (nombre == "admin" && password == "123"){
            console.log("Ingresar como administrador...")
            const usuario = [nombre, password];
            localStorage.setItem("usuario", JSON.stringify(usuario));
            window.location.href = "catalogo.html";
        }else if (nombre == "user" && password == "123"){
            console.log("Ingresar como cliente...");
            const usuario = [nombre, password];
            localStorage.setItem("usuario", JSON.stringify(usuario));
            window.location.href = "tienda.html";
        }else{
            console.log("Error...");
        }

    });

    const catalogoMemoria = JSON.parse(localStorage.getItem("catalogo")) || [];

    if (catalogoMemoria.length <= 0){
        const preCargados = [
            {id: "1", nombre: "Panditas", precio: 15, imagen: "images/panditas.jpg"},
            {id: "2", nombre: "Panditas c/chamoy", precio: 20, imagen: "images/panditas_chamoy.jpg"},
            {id: "3", nombre: "Gusanitos", precio: 15, imagen: "images/gusanitos.jpg"},
            {id: "4", nombre: "Gusanitos c/chamoy", precio: 15, imagen: "images/gusanitos_chamoy.jpg"}
        ];
        preCargados.forEach(item => {
            const nuevo = [item.id, item.nombre, item.precio, item.imagen];
            catalogoMemoria.push(nuevo);
        });
        localStorage.setItem("catalogo", JSON.stringify(catalogoMemoria)); 
        
    }

});