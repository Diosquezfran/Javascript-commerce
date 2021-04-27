let carritoFilter = [];

let total = ``;
if(localStorage.getItem("carrito") != null){
    let valoresDeCarrito = JSON.parse(localStorage.getItem("carrito"));
    carritoFilter = valoresDeCarrito;
    let aux2 = 0;
    for(let i = 0; i < carritoFilter.length; i++){
        aux2 += carritoFilter[i].precio;
    }
    total += `<div id="total"><h4>Total a pagar: USD ${aux2}</h4></div>
    `
}

let aux = ``;
for(let i = 0; i < carritoFilter.length ; i++){
        if(carritoFilter[i].sotck > 0){

        aux += `<div id="card-check">
                <ul>
                    <li><b>Poducto:</b> ${carritoFilter[i].marca}  ${carritoFilter[i].modelo}</li>
                    <li><b>Precio:</b> USD${carritoFilter[i].precio}</li>
                    </ul>
        `}
}

document.getElementById("card-check").innerHTML = aux;    
document.getElementById("total").innerHTML = total;    