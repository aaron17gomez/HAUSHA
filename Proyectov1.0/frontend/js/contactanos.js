if(sessionStorage.getItem('rolUsuarioActivo') == "true"){
    llenarNavBarUsuario();
}else{
    llenarNavBar();
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
          <a class="nav-link disabled" aria-current="page" href="contactanos.html">Contáctanos</a>
        </li>
        <li class="nav-item">
        <button class="btn btn-outline-success" type="button" onclick="iniciar();">Iniciar Sesión</button>
         </li>
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
              <a class="nav-link disabled" aria-current="page" href="contactanos.html">Contáctanos</a>
            </li>
            <li id="sesionIniciada" class="nav-item dropdown">
              
            </li>
        </ul>
    `;
  }
  