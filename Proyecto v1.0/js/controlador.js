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
        <a class="nav-link active" aria-current="page" href="habitaciones.html">Propuestas</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="#">Contáctanos</a>
      </li>
      <li class="nav-item">
        <button class="btn btn-outline-success" type="button" onclick="iniciar();">Iniciar Sesión</button>
      </li>
    </ul>
    `;
}

function iniciar(){
    window.location.href = 'registro.html';
}
/*
if(sessionStorage.getItem('rolUsuarioActivo') == "true"){
    llenarNavBarUsuario();
}else{
    llenarNavBar();
}
*/

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

