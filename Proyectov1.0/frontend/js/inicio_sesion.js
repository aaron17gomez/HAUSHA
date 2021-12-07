if(sessionStorage.getItem('identificadorUsuario') == 0){
    llenarNavBarUsuario();
    window.location.href = 'superAdministrador.html';
}else if(sessionStorage.getItem('identificadorUsuario') == 1){
    llenarNavBarUsuario();
    window.location.href = 'usuario.html';
}
else if(sessionStorage.getItem('identificadorUsuario') == 2){
    llenarNavBarUsuario();
    window.location.href = 'administrador.html';
}
else{
    llenarNavBar();
}

var identificador;
var usuarios = [];
const url = '../../Proyectov1.0/backend/api/usuarios.php';
function obtenerUsuarios(){
    axios({
        method:'GET',
        url:url,
        responseType:'json'
    }).then(res=>{
        this.usuarios = res.data;
    }).catch(error=>{
        console.error(error);
    });
}
obtenerUsuarios();

const firebaseConfig = {
    apiKey: "AIzaSyAsUlisf5yn5dq8_T99fLEQU1Hbkk0AK-k",
    authDomain: "fir-php-test-d5d57.firebaseapp.com",
    databaseURL: "https://fir-php-test-d5d57-default-rtdb.firebaseio.com",
    projectId: "fir-php-test-d5d57",
    storageBucket: "fir-php-test-d5d57.appspot.com",
    messagingSenderId: "486658166814",
    appId: "1:486658166814:web:ca7a7e3ba7930298095e0f"
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function cerrar() {
    firebase.auth().signOut()
        .then(function () {
            console.log('Salir');
        })
        .catch(function (error) {
            console.log(error);
        })
}


function validarCredenciales(pCorreo, pContraseña){
    var bAcceso = false;
    for(const usu in usuarios){
        if(usuarios[usu].correo == pCorreo && usuarios[usu].contrasena == pContraseña){
            bAcceso = true;
            identificador = usu;
            let nom = usuarios[usu].nombre + ' ' + usuarios[usu].apellido;
            let ident = true;
            let idUsu = usu;
            sessionStorage.setItem('usuarioActivo', nom);
            sessionStorage.setItem('rolUsuarioActivo', ident);
            sessionStorage.setItem('idUsuarioActivo', idUsu);
            sessionStorage.setItem('identificadorUsuario', usuarios[usu].identificador);
        }
    }

    return bAcceso;
}

function iniciarSesion(){
    var sCorreo = '';
    var sContraseña = '';
    var bAcceso = false;

    acceso();

    sCorreo = document.querySelector('#txtcorreo').value;
    sContraseña = document.querySelector('#txtcontrasena').value;
    bAcceso = validarCredenciales(sCorreo, sContraseña);
    
    if(bAcceso == true){
        if(usuarios[identificador].identificador == 0){
            window.location.href = 'superAdmnistrador.html';
        }else if(usuarios[identificador].identificador == 1){
            window.location.href = 'usuario.html';
        }else if(usuarios[identificador].identificador == 2){
            window.location.href = 'administrador.html';
        }
    }else{
        texto = "El usuario || contraseña no coinciden";
        informacion(texto);
    }
}

function acceso() {
    var emailA = document.getElementById('txtcorreo').value;
    var passA = document.getElementById('txtcontrasena').value;
    firebase.auth().signInWithEmailAndPassword(emailA, passA)
    .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
}

function validar(){
    var usua;
    var emailA = document.getElementById('txtcorreo').value;
    for(const usu in usuarios){
        if(usuarios[usu].correo == emailA){
            usua = usuarios[usu];
        }
    }

    console.log(usua);
    /*
    let reser;
    if(usuarios[datosNotificaciones.key].reservacion){
      reser = usuarios[datosNotificaciones.key].reservacion;
    }else{
      reser = [];
    }  

    usuActualizado = {
      id:usuarios[datosNotificaciones.key].id,
      nombre:usuarios[datosNotificaciones.key].nombre,
      apellido:usuarios[datosNotificaciones.key].apellido,
      correo:usuarios[datosNotificaciones.key].correo,
      telefono:usuarios[datosNotificaciones.key].telefono,
      nombreUsuario:usuarios[datosNotificaciones.key].nombreUsuario,
      contrasena:usuarios[datosNotificaciones.key].contrasena,
      fecha:usuarios[datosNotificaciones.key].fecha,
      imagen:usuarios[datosNotificaciones.key].imagen,
      nacionalidad:usuarios[datosNotificaciones.key].nacionalidad,
      genero:usuarios[datosNotificaciones.key].genero,
      identificador:usuarios[datosNotificaciones.key].identificador,
      propuestas:usuarios[datosNotificaciones.key].identificador,
      reservacion:reser,
      descripcion:usuarios[datosNotificaciones.key].descripcion,
      notificaciones:res,
      cuentaVerificada:usuarios[datosNotificaciones.key].cuentaVerificada,
      pago:usuarios[datosNotificaciones.key].pago
    };
      axios({
        method:'PUT',
        url:url + `?id=${datosNotificaciones.key}`,
        responseType:'json',
        data:usuActualizado
    }).then(res=>{
        console.log(res.data);
        verNotificaciones();
    }).catch(error=>{
        console.error(error);
    });
    */
}

function validarRegistro(){
    let texto;
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
        texto = "Todos los campos son necesarios";
        informacion(texto);
        return false;
    }
    else if(nombre.length>20){
        texto = "El nombre es muy largo";
        informacion(texto);
        return false;
    }
    else if(apellido.length>30){
        texto = "El apellido es muy largo";
        informacion(texto);
        return false;
    }else if(correo.length>40){
        texto = "El email es muy largo";
        informacion(texto);
        return false;
    }
    else if(!expresion.test(correo)){
        texto = "El email no es válido";
        informacion(texto);
        return false;
    }else if(nombreUsuario.length>30 || contrasena.length>20){
        texto = "El nombre de usuario es muy largo o la contraseña es muy larga";
        informacion(texto);
        return false;
    }else if(telefono.length>10){
        texto = "El telefono es muy largo";
        informacion(texto);
        return false;
    }else if(isNaN(telefono)){
        texto = "El telefono ingresado no es un número";
        informacion(texto);
        return false;
    }else{
        return true
    }
}

function crearUsuarioCliente(){
    let mail = document.getElementById('correo').value;
    let contador = 0;
    let filtro = [];
    let usuText = "El correo ingresado ya existe";
    for(const usu in usuarios){
        filtro.push(usuarios[usu]);
        contador++;
    }
    const resultado = filtro.filter(usuarios => usuarios.correo == mail);
    console.log(resultado);
    if(resultado.length == 1){
        informacion(usuText);
    }else{
        let estado = false;
        estado = validarRegistro();
        if(estado == true){
        console.log(contador);
        const cliente = {
            id: contador,
            nombre:document.getElementById('nombre').value,
            apellido:document.getElementById('apellido').value,
            correo:document.getElementById('correo').value,
            telefono:document.getElementById('telefono').value,
            nombreUsuario:document.getElementById('nombreUsuario').value,
            contrasena:document.getElementById('contrasena').value,
            fecha:document.getElementById('fecha').value,
            nacionalidad:document.getElementById('lista-nacionalidad').value,
            genero:document.getElementById('lista-genero').value,
            imagen:document.getElementById('lista-imagenes').value,
            reservacion:[],
            propuestas:[],
            identificador:"1",
            descripcion:"Ninguna",
            notificaciones:"Ninguna",
            cuentaVerificada:false,
            pago:"Ninguno"
        }
            axios({
            method:'POST',
            url:url,
            responseType:'json',
            data:cliente
        }).then(res=>{
            console.log(res.data);
            obtenerUsuarios();
            enviar();
            correcto();
            $("#modalRegistro .close").click();
        }).catch(error=>{
            console.error(error);
        });
        }
    }
}

function enviar() {
    var email = document.getElementById('correo').value;
    var pass = document.getElementById('contrasena').value;
    firebase.auth().createUserWithEmailAndPassword(email, pass)
    .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
    })
    .then(function () {
        verificar();
    });
}

function verificar() {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function () {
        // Email sent.
    }).catch(function (error) {
        // An error happened.
    });
}

function informacion(info){
    let texto = info;
    document.getElementById("Mensaje").innerHTML = '';
    document.getElementById("Mensaje").innerHTML +=
    `
    <div class="alert alert-info">
        <a class="closeAlert" data-dismiss="alert">×</a>
        <strong>Info!</strong>${texto}.
    </div>
    `;
}

function alerta(){
    document.getElementById("Mensaje").innerHTML = '';
    document.getElementById("Mensaje").innerHTML +=
    `
    <div class="alert alert-error">
        <a class="closeAlert" data-dismiss="alert">×</a>
        <strong>Error!</strong>This is a fatal error.
    </div>
    `;
}

function correcto(){
    document.getElementById("Mensaje").innerHTML = '';
    document.getElementById("Mensaje").innerHTML +=
    `
    <div class="alert alert-success">
      <a class="closeAlert" data-dismiss="alert">×</a>
      <strong>Exito!</strong>El usuario ha sido registrado con éxito.
    </div>
    `;
}

function vaciarModal(){
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('correo').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('nombreUsuario').value = '';
    document.getElementById('contrasena').value = '';
    document.getElementById('fecha').value = '';
    document.getElementById('lista-nacionalidad').value = '';
    document.getElementById('lista-genero').value = '';
    document.getElementById('lista-imagenes').value = '';
}

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
          <a class="nav-link active" aria-current="page" href="contactanos.html">Contáctanos</a>
        </li>
        <li class="nav-item">
          <button class="btn btn-outline-success disabled" type="button" onclick="">Iniciar Sesión</button>
        </li>
    </ul>
    `;
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
              <a class="nav-link active" aria-current="page" href="contactanos.html">Contáctanos</a>
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

