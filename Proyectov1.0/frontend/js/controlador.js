if(sessionStorage.getItem('rolUsuarioActivo') == "true"){
  llenarNavBarUsuario();
}else{
  llenarNavBar();
}

/*
var usuarios2 = [
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
        reservacion:[
          {
            nombreCategoria:"Casa",
            nombre:"Casa 1",
            descripcion:"Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
            imagen:"img/propuestas/Casa/1.jpg",
            precio:"124.32"
          }
        ]
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
        reservacion:[
          {
            nombreCategoria:"Casa",
            nombre:"Casa 1",
            descripcion:"Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
            imagen:"img/propuestas/Casa/1.jpg",
            precio:"124.32"
          }
        ]
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
        reservacion:[
          {
            nombreCategoria:"Casa",
            nombre:"Casa 1",
            descripcion:"Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
            imagen:"img/propuestas/Casa/1.jpg",
            precio:"124.32"
          }
        ]
    }
];


function guardar(){
  for(let i=0;i<usuarios2.length;i++){
        axios({
          method:'POST',
          url:url,
          responseType:'json',
          data:usuarios2[i]
      }).then(res=>{
          console.log(res.data);
          obtenerUsuarios();
      }).catch(error=>{
          console.error(error);
      });
  }
}
guardar();
*/

var usuarios = [];
const url = '../../Proyectov1.0/backend/api/usuarios.php';
function obtenerUsuarios(){
    axios({
        method:'GET',
        url:url,
        responseType:'json'
    }).then(res=>{
        this.usuarios = res.data;
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
          <a class="nav-link disabled" aria-current="page" href="index.html">Inicio</a>
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

        <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <img id="perfil1" src="#" alt="">iniciar sesion
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li><a class="dropdown-item" href="administrador.html">iniciar sesion Administrador</a></li>
          <li><a class="dropdown-item" href="registro.html">inicio sesion usuario</a></li>
          <li><hr class="dropdown-divider"></li>
         
        </ul>
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
              <a class="nav-link active" aria-current="page" href="habitaciones.html">Propuestas</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Contáctanos</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img id="perfil" src="img/perfil.png" alt="">Perfil
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="perfil.html">Editar Perfil</a></li>
                <li><a class="dropdown-item" href="reservaciones.html">Reservaciones</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a type="button" class="dropdown-item" onclick="cerrarSesion();">Cerrar Sesion</a></li>
              </ul>
            </li>
        </ul>
    `;
}

function cerrarSesion(){
    sessionStorage.clear();
    llenarNavBar();
}