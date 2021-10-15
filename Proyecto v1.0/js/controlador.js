var usuarios = [
    {
        id:0,
        nombre:"Pedro",
        apellido:"Martinez",
        correo:"pedro.martinez@gmail.com",
        telefono:"98124158",
        nombreUsuario:"Pedrito",
        contrasena:"pedro123",
        fecha:"1996-07-21",
        imagen:"img/perfil/lufi.jpg",
        reservacion:[]
    },
    {
        id:1,
        nombre:"Mario",
        apellido:"Cruz",
        correo:"mario.cruz@gmail.com",
        telefono:"33548569",
        nombreUsuario:"Marito",
        contrasena:"mario123",
        fecha:"1995-01-21",
        imagen:"img/perfil/goku.jpg",
        reservacion:[]
    },
    {
        id:2,
        nombre:"Luisa",
        apellido:"Lopez",
        correo:"luisa.lopez@gmail.com",
        telefono:"96857420",
        nombreUsuario:"Lulu",
        contrasena:"lulu123",
        fecha:"1997-07-21",
        imagen:"img/perfil/naruto.jpg",
        reservacion:[]
    }
];

var localStorage = window.localStorage;

if(localStorage.getItem("usuarios")==null){
    localStorage.setItem("usuarios",JSON.stringify(usuarios));
}else{
    usuarios = JSON.parse(localStorage.getItem('usuarios'));
}

function llenarNavBar(){
    document.getElementById("navbar-form").innerHTML = '';
    document.getElementById("navbar-form").innerHTML +=
    `
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <a class="nav-link disabled" aria-current="page" href="index.html">Inicio</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="#">Nosotros</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="#">Contáctanos</a>
      </li>
      <li class="nav-item">
        <button class="btn btn-outline-success" type="button" data-toggle="modal" data-target="#modalInicio">Iniciar Sesión</button>
      </li>
    </ul>
    `;
}
if(sessionStorage.getItem('rolUsuarioActivo') == "true"){
    llenarNavBarUsuario();
}else{
    llenarNavBar();
}


function llenarNavBarUsuario(){
    document.getElementById("navbar-form").innerHTML = '';
    document.getElementById("navbar-form").innerHTML +=
    `
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <a class="nav-link disabled" aria-current="page" href="index.html">Inicio</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle active" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Propuestas
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li><a class="dropdown-item" href="habitaciones.html">Habitaciones</a></li>
          <li><a class="dropdown-item" href="perfil.html">Perfil</a></li>
        </ul>
      </li>
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="#">Nosotros</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="#">Contáctanos</a>
      </li>
      <li class="nav-item">
        <button class="btn btn-outline-success" type="button" onclick="cerrarSesion()">Cerrar Sesión</button>
      </li>
    </ul>
    `;
}

function cerrarSesion(){
    sessionStorage.clear();
    llenarNavBar();
}


function validarCredenciales(pCorreo, pContraseña){
    var listaUsuarios = JSON.parse(localStorage.getItem('usuarios'));
    var bAcceso = false;
    for(var i=0; i<listaUsuarios.length; i++){
        if(listaUsuarios[i].correo == pCorreo && listaUsuarios[i].contrasena == pContraseña){
            bAcceso = true;
            let nom = listaUsuarios[i].nombre + ' ' + listaUsuarios[i].apellido;
            let ident = true;
            sessionStorage.setItem('usuarioActivo', nom);
            sessionStorage.setItem('rolUsuarioActivo', ident);
            console.log(listaUsuarios[i]);
        }
    }

    return bAcceso;
}

function iniciarSesion(){
    var sCorreo = '';
    var sContraseña = '';
    var bAcceso = false;

    sCorreo = document.querySelector('#txtcorreo').value;
    sContraseña = document.querySelector('#txtcontrasena').value;
    bAcceso = validarCredenciales(sCorreo, sContraseña);
    
    if(bAcceso == true){
        ingresar();
    }
}

function ingresar(){
    $('#modalInicio').modal('hide');
    llenarNavBarUsuario();
    $('#modalInicio').modal('hide');
    $('#modalInicio').modal('hide');
}


function validarRegistro(){
    var nombre,apellido,correo,contrasena,fecha,imagen,nombreUsuario,telefono;

        nombre=document.getElementById('nombre').value,
        apellido=document.getElementById('apellido').value,
        correo=document.getElementById('correo').value,
        telefono=document.getElementById('telefono').value,
        nombreUsuario=document.getElementById('nombreUsuario').value,
        contrasena=document.getElementById('contrasena').value,
        fecha=document.getElementById('fecha').value,
        imagen=document.getElementById('lista-imagenes').value,
    
    expresion = /\w+@\w+\.+[a-z]/;
    
    if(nombre === "" || apellido === "" || correo==="" || telefono === "" || nombreUsuario == "" || contrasena === "" || fecha === "" || imagen === ""){
        alert("todos los campo son obligatorios");
        return false;
    }
    else if(nombre.length>20){
        alert("El nombre es muy largo");
        return false;
    }
    else if(apellido.length>30){
        alert("El apellido es muy largo");
        return false;
    }else if(correo.length>40){
        alert("El email es muy largo");
        return false;
    }
    else if(!expresion.test(correo)){
        alert("El email no es válido");
        return false;
    }else if(nombreUsuario.length>30 || contrasena.length>20){
        alert("El nombre es muy largo");
        return false;
    }else if(telefono.length>10){
        alert("El telefono es muy largo");
        return false;
    }else if(isNaN(telefono)){
        alert("El telefono ingresado no es un número");
        return false;
    }else{
        return true
    }
}

function crearUsuarioCliente(){
    let estado = false;
    estado = validarRegistro();
    if(estado == true){
        const cliente = {
            id: usuarios.length,
            nombre:document.getElementById('nombre').value,
            apellido:document.getElementById('apellido').value,
            correo:document.getElementById('correo').value,
            telefono:document.getElementById('telefono').value,
            nombreUsuario:document.getElementById('nombreUsuario').value,
            contrasena:document.getElementById('contrasena').value,
            fecha:document.getElementById('fecha').value,
            imagen:document.getElementById('lista-imagenes').value,
            reservacion:[]
        }
    
        usuarios.push(cliente);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        $('#modalRegistro').modal('hide');
        $('#modalInicio').modal('hide');
        
    }
}