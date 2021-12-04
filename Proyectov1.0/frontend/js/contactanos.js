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
          <a class="nav-link disable" aria-current="page" href="#">Contáctanos</a>
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
            <a class="nav-link active" aria-current="page" href="habitaciones.html">Propuestas</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" aria-current="page" href="contactanos.html">Contáctanos</a>
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
    <li><a class="dropdown-item" href="#" type="button" onclick="redireccionar();">Ver perfil</a></li>
    <li><a type="button" onclick="verReservacion();" class="dropdown-item" data-toggle="modal" data-target="#modalReservacion">Ver reservaciones</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a type="button" class="dropdown-item" onclick="cerrarSesion();">Cerrar Sesion</a></li>
  </ul>
`;
}

function redireccionar(){
  if(sessionStorage.getItem('identificadorUsuario') == 0){
    window.location.href = 'superAdministrador.html';
  }else if(sessionStorage.getItem('identificadorUsuario') == 1){
      window.location.href = 'usuario.html';
  }
  else if(sessionStorage.getItem('identificadorUsuario') == 2){
      window.location.href = 'administrador.html';
  }
}

function cerrarSesion(){
    sessionStorage.clear();
    llenarNavBar();
}

function verReservacion(){
  let usuActual = sessionStorage.getItem('idUsuarioActivo');
  if(usuarios[usuActual].reservacion){
    let reser = usuarios[usuActual].reservacion[0];
    document.getElementById("modalRegistroLabel").innerHTML = '';
    document.getElementById("modalRegistroLabel").innerHTML = 'Reservacion Actual';
    document.getElementById("verReservacion").innerHTML = '';
    document.getElementById("verReservacion").innerHTML +=
    `
    <div class="card">
       <div class="card-body">
           <div class="row form-group">
               <div class="col-lg-8 ml-auto">
                    <img id="izquierda" src="${reser.imagen}" alt="">
               </div>
               <div id="derecha" class="col-lg-4">
                    <h3>HAUSHA ${reser.nombre}</h3>
                    <p id="tex" class="card-title">${reser.descripcion}</p>
                    <img src="img/icons-habitaciones/wifi.png" alt="">
                    <img src="img/icons-habitaciones/tv.png" alt="">
                    <img src="img/icons-habitaciones/bañera.png" alt="">
                    <img src="img/icons-habitaciones/comida.jpg" alt="">
                    <img src="img/icons-habitaciones/aprobado.png" alt="">
                    <img src="img/icons-habitaciones/aprobado.png" alt=""><br>
                    <div>
                       <p>Desde</p>
                       <h4>$${reser.precio}</h4>
                    </div>
               </div>
           </div>
       </div>
    </div>
    `;
  }else{
    document.getElementById("modalRegistroLabel").innerHTML = '';
    document.getElementById("modalRegistroLabel").innerHTML = 'No tienes reservación';
    document.getElementById("verReservacion").innerHTML = '';
    document.getElementById("verReservacion").innerHTML +=
    `
    <h3>Realiza una reservacion</h3>
    `;
  }
}

function mandarNotificacion(){
  let nombre = document.getElementById('nombre').value;
  let telefono = document.getElementById('telefono').value;
  let correo = document.getElementById('correo').value;
  let mensaje = document.getElementById('mensaje').value;

  let notificacion = {
    asunto:"Mensaje de contactanos",
    mensaje:"Nombre: "+nombre+" Telefono: "+telefono+" Correo: "+correo+" Mensaje: "+mensaje,
    leido:false
  }
  let contador = 0;
  let filtro = [];
  let key = [];
    for(const usu in usuarios){
        filtro.push(usuarios[usu]);
        contador++;
        if(usuarios[usu].identificador != 1){
          key.push(usu); 
        }
    }
  const resultado = filtro.filter(usuarios => usuarios.identificador != 1);
  console.log("filtro: ",resultado);
  console.log(key);
  for(let i=0;i<resultado.length;i++){
    let pro;
      if(resultado[i].propuestas){
        pro = resultado[i].propuestas;
      }else{
        pro = [];
      }
    let reser;
      if(resultado[i].reservacion){
        reser = resultado[i].reservacion;
      }else{
        reser = [];
      }
    let res;
      if(resultado[i].descripcion == "Ninguna"){
        res = [notificacion];
      }else{
        res = resultado[i].descripcion;
        res.push(notificacion);
  }
    usuActualizado = {
      id:resultado[i].id,
      nombre:resultado[i].nombre,
      apellido:resultado[i].apellido,
      correo:resultado[i].correo,
      telefono:resultado[i].telefono,
      nombreUsuario:resultado[i].nombreUsuario,
      contrasena:resultado[i].contrasena,
      fecha:resultado[i].fecha,
      imagen:resultado[i].imagen,
      nacionalidad:resultado[i].nacionalidad,
      genero:resultado[i].genero,
      identificador:resultado[i].identificador,
      propuestas:pro,
      reservacion:reser,
      descripcion:res
    };
      axios({
        method:'PUT',
        url:url1 + `?id=${key[i]}`,
        responseType:'json',
        data:usuActualizado
    }).then(res=>{
        console.log(res.data);
    }).catch(error=>{
        console.error(error);
    });
  }
}