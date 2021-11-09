if(sessionStorage.getItem('rolUsuarioActivo') == "true"){
    llenarNavBarUsuario();
}else{
    llenarNavBar();
}

var usuarios = [];
const url1 = '../../Proyectov1.0/backend/api/usuarios.php';
function obtenerUsuarios(){
    axios({
        method:'GET',
        url:url1,
        responseType:'json'
    }).then(res=>{
        this.usuarios = res.data;
        if(sessionStorage.getItem('rolUsuarioActivo') == "true"){
          botonesPerfil();
        }
        console.log(usuarios);
    }).catch(error=>{
        console.error(error);
    });
}
obtenerUsuarios();

function llenarNavBar(){
    document.getElementById("navbar-form").innerHTML = '';
    document.getElementById("navbar-form").innerHTML +=
    `
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="index.html">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="nosotros.html">Nosotros</a>
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

function llenarNavBarUsuario(){
    document.getElementById("navbar-form").innerHTML = '';
    document.getElementById("navbar-form").innerHTML +=
    `
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="index.html">Inicio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="nosotros.html">Nosotros</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" aria-current="page" href="habitaciones.html">Propuestas</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Contáctanos</a>
            </li>
            <li id="sesionIniciada" class="nav-item dropdown">
              
            </li>
        </ul>
    `;
}

function botonesPerfil(){
    let usuar = sessionStorage.getItem('idUsuarioActivo');
    document.getElementById("sesionIniciada").innerHTML = '';
    document.getElementById("sesionIniciada").innerHTML += 
    `
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      <img id="perfil" src="${usuarios[usuar].imagen}" alt="">${usuarios[usuar].nombre} ${usuarios[usuar].apellido}
      </a>
      <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
        <li><a class="dropdown-item" href="perfil.html">Editar Perfil</a></li>
        <li><a class="dropdown-item" href="reservaciones.html">Reservaciones</a></li>
        <li><a class="dropdown-item" type="button" onclick="llenarSelectPropuesta();" data-toggle="modal" data-target="#modalCrearPropuestas">Crear propuestas</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a type="button" class="dropdown-item" onclick="cerrarSesion();">Cerrar Sesion</a></li>
      </ul>
    `;
  }

function cerrarSesion(){
    sessionStorage.clear();
    llenarNavBar();
}