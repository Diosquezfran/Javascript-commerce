let carrito = [];
const dataBaseMotos = [];
const dataBaseAutomoviles = [];

if(localStorage.getItem("carrito") != null){
    let valoresDeCarrito = JSON.parse(localStorage.getItem("carrito"));
    carrito = valoresDeCarrito;
    let aux2 = 0;
    for(let i = 0; i < carrito.length; i++){
        aux2 += carrito[i].precio;
        document.getElementById("carrito").innerHTML = `
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                carrito
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li class="dropdown-item" >${carrito[i].marca}  ${carrito[i].modelo}</li>
                <li class="dropdown-item" >Total USD: ${aux2}</li>
                <div class="carrito_boton">
                    <button class="boton-clean" onclick='vaciarCarrito(${JSON.stringify(carrito)})'>Vaciar carrito</button>
                    <li class="dropdown-item boton-compra" ><a href="/proyecto1/checkout/checkout.html">Finalizar compra</a></li>
                </div>
                </ul>
            </div>`
    }    
}

class Automovil{
    constructor(imagen, marca, modelo, precio, sotck){
        this.imagen = imagen;
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
        this.sotck = sotck;
    }
}

let camioneta = new Automovil("/proyecto1/img/camaro.png", "Chevrolet", "Camaro", 40000, 5);
let auto = new Automovil("/proyecto1/img/mondeo.png", "Ford", "Mondeo", 13000, 2);
let suv = new Automovil("/proyecto1/img/a8.png", "Audi", "A8", 13000, 2)
dataBaseAutomoviles.push(auto);
dataBaseAutomoviles.push(camioneta);
dataBaseAutomoviles.push(suv);

$.get('/proyecto1/dataMotos.json', function(data, status){
    for(i = 0; i < data.length; i++){
        dataBaseMotos.push(data[i]);
    }
    let auxMoto = ``;
    for(let i = 0; i < dataBaseMotos.length; i++){
        if(dataBaseMotos[i].sotck > 0){
                auxMoto += `
                <div class="w3-third w3-margin-bottom">
                    <ul class="w3-ul w3-border w3-center w3-hover-shadow">
                        <img src=${dataBaseMotos[i].imagen} style="height:100px" >
                        <li class="w3-padding-16">
                            <h4 class="card-title">
                                ${dataBaseMotos[i].marca}
                                ${dataBaseMotos[i].modelo}
                            </h4>
                        </li>  
                        <li class="w3-padding-16">
                            <h3>U$D ${dataBaseMotos[i].precio}</h3>
                        </li>
                        <li class="w3-light-grey w3-padding-24">
                            <button class="w3-button w3-green w3-padding-large" onclick='agregarAlCarrito(${JSON.stringify(dataBaseMotos[i])})'>Agregar al carrito</button>
                            <button class="w3-button w3-green w3-padding-large" onclick='borrarUnProducto(${JSON.stringify(dataBaseMotos[i])})'>Eliminar</button>
                        </li>
                    </ul>
                </div>
                `
        };
        $('#motos').html(auxMoto);
    }
});

let auxAuto = ``;
for(let i = 0; i < dataBaseAutomoviles.length; i++){
    if(dataBaseAutomoviles[i].sotck > 0){
        auxAuto += `
        <div class="w3-third w3-margin-bottom">
            <ul class="w3-ul w3-border w3-center w3-hover-shadow">
                <img src=${dataBaseAutomoviles[i].imagen} style="height: 100px" >
                <li class="w3-padding-16">
                    <h4 class="card-title">
                        ${dataBaseAutomoviles[i].marca}
                        ${dataBaseAutomoviles[i].modelo}
                    </h4>
                </li>  
                <li class="w3-padding-16">
                    <h3>U$D ${dataBaseAutomoviles[i].precio}</h3>
                </li>
                <li class="w3-light-grey w3-padding-24">
                    <button class="w3-button w3-green w3-padding-large" onclick='agregarAlCarrito(${JSON.stringify(dataBaseAutomoviles[i])})'>Agregar al carrito</button>
                    <button class="w3-button w3-green w3-padding-large" onclick='borrarUnProducto(${JSON.stringify(dataBaseAutomoviles[i])})'>Eliminar</button>
                </li>
            </ul>
        </div>
        `
    }
}   
$('#autos').html(auxAuto);

function agregarAlCarrito(producto){
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    let aux = 0;
    for(let i = 0; i < carrito.length; i++){
        aux += carrito[i].precio;
        document.getElementById("carrito").innerHTML = `
                    <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    carrito
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li class="dropdown-item" >${carrito[i].marca}  ${carrito[i].modelo}</li>
                    <li class="dropdown-item" >Total USD: ${aux}</li>
                    <div class="carrito_boton">
                    <button class="boton-clean" onclick='vaciarCarrito(${JSON.stringify(carrito)})'>Vaciar carrito</button>
                     <li class="dropdown-item boton-compra" ><a href="/proyecto1/checkout/checkout.html">Finalizar compra</a></li>
                    </div>
                    </ul>
                </div>`
    }
}

function borrarUnProducto(producto) {
    carrito = carrito.filter(item => item.modelo != producto.modelo);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    if(carrito.length > 0){
        let aux = 0;
        for(let i = 0; i < carrito.length; i++){
             aux += carrito[i].precio;
             document.getElementById("carrito").innerHTML = `
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    carrito
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li class="dropdown-item" >Total USD: ${aux}</li>
                    <div class="carrito_boton">
                    <button class="boton-clean" onclick='vaciarCarrito(${JSON.stringify(carrito)})'>Vaciar carrito</button>
                        <li class="dropdown-item boton-compra" ><a href="/proyecto1/checkout/checkout.html">Finalizar compra</a></li>
                    </div>
                    </ul>
                </div>`;
         }
    
    }
    else{    
         document.getElementById("carrito").innerHTML = `
         <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            carrito
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li class="dropdown-item" >Total USD: 0</li>
            <div class="carrito_boton">
                <button class="boton-clean" onclick='vaciarCarrito(${JSON.stringify(carrito)})'>Vaciar carrito</button>
                <li class="dropdown-item boton-compra" ><a href="/proyecto1/checkout/checkout.html">Finalizar compra</a></li>
            </div>  
            </ul>
        </div>
         `}
}
 const vaciarCarrito = (carrito) => {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    if(carrito.length = []){    
        document.getElementById("carrito").innerHTML = `
        <div class="dropdown">
           <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
           carrito
           </button>
           <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
           <li class="dropdown-item" >Total USD: 0</li>
           <div class="carrito_boton">
               <button class="boton-clean" onclick='vaciarCarrito(${JSON.stringify(carrito)})'>Vaciar carrito</button>
               <li class="dropdown-item boton-compra" ><a href="/proyecto1/checkout/checkout.html">Finalizar compra</a></li>
           </div>  
           </ul>
       </div>
        `}
 }