//Validar que no entre a la tienda nadie que tenga una sesión
const user = JSON.parse(localStorage.getItem("usuario"));
if (user == null) {
    window.location.href = "index.html";
}
document.addEventListener("DOMContentLoaded", function () {
    //Recuperar la tabla en el documento
    const infoTicket = document.getElementById("infoTicket");
    //Recuperar los datos de la compra
    const compra = JSON.parse(localStorage.getItem("arregloEnvio")) || [];

    var totProd = 0;
    var totComp = 0;
    //Recorre cada producto de la compra y lo coloca en la tabla
    compra.forEach(element => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${element.cantidadArt}</td>
            <td>${element.nombreArt}</td>
            <td>$${element.precioArt}</td>
        `;
        infoTicket.appendChild(fila);
        totProd = totProd + element.cantidadArt;
        totComp = totComp + (element.cantidadArt * element.precioArt);
    });

    //Calcula el total de la venta y de articulos
    const totalCompra = document.querySelector("#totalCompra");
    const totalProductos = document.querySelector("#totalProductos");

    totalCompra.textContent = "Total: $"+totComp;
    totalProductos.textContent = "QTY Total: " + totProd;

    const txtFecha = document.querySelector("#fecha");
    var fecha = new Date();
    txtFecha.textContent = fecha.getDay()+"/"+fecha.getMonth()+"/"+fecha.getFullYear()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();


});