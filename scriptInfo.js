const user = JSON.parse(localStorage.getItem("usuario"));
document.querySelector("#catalogo").setAttribute("style", "display: none");
document.querySelector("#tiendaOnline").setAttribute("style","display: none");
document.querySelector("#cerrarSesion").setAttribute("style", "display: none");
document.querySelector("#acercaDe").setAttribute("style", "display: none");
if (user == null) {
    document.querySelector("#usuarioBarra").textContent = "";

}else{
    document.querySelector("#usuarioBarra").textContent = user[0];
    if (user[0] == "user"){
        document.querySelector("#cerrarSesion").setAttribute("style", "display: flex");
        document.querySelector("#acercaDe").setAttribute("style", "display: flex");
        document.querySelector("#tiendaOnline").setAttribute("style","display: flex");
    }
    if (user[0] == "admin"){
        document.querySelector("#catalogo").setAttribute("style", "display: flex");
        document.querySelector("#cerrarSesion").setAttribute("style", "display: flex");
        document.querySelector("#acercaDe").setAttribute("style", "display: flex");
        document.querySelector("#tiendaOnline").setAttribute("style","display: flex");
    }
}