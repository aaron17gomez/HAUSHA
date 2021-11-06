<?php

    class Usuario{
        private $id;
        private $nombre;
        private $apellido;
        private $correo;
        private $telefono;
        private $nombreUsuario;
        private $contrasena;
        private $fecha;
        private $imagen;
        private $reservacion;

        public function __construct(
            $id,
            $nombre,
            $apellido,
            $correo,
            $telefono,
            $nombreUsuario,
            $contrasena,
            $fecha,
            $imagen,
            $reservacion
        ){
            $this->id = $id;
            $this->nombre = $nombre;
            $this->apellido = $apellido;
            $this->correo = $correo;
            $this->telefono = $telefono;
            $this->nombreUsuario = $nombreUsuario;
            $this->contrasena = $contrasena;
            $this->fecha = $fecha;
            $this->imagen = $imagen;
            $this->reservacion = $reservacion;
        }

        /**
        * Get the value of id
        */ 
        public function getid()
       {
              return $this->id;
       }

       /**
        * Set the value of id
        *
        * @return  self
        */ 
       public function setid($id)
       {
              $this->id = $id;

              return $this;
       }

       /**
        * Get the value of nombre
        */ 
        public function getnombre()
       {
              return $this->nombre;
       }

       /**
        * Set the value of nombre
        *
        * @return  self
        */ 
       public function setnombre($nombre)
       {
              $this->nombre = $nombre;

              return $this;
       }

       /**
        * Get the value of apellido
        */ 
        public function getapellido()
       {
              return $this->apellido;
       }

       /**
        * Set the value of apellido
        *
        * @return  self
        */ 
       public function setapellido($apellido)
       {
              $this->apellido = $apellido;

              return $this;
       }

       /**
        * Get the value of correo
        */ 
        public function getcorreo()
       {
              return $this->correo;
       }

       /**
        * Set the value of correo
        *
        * @return  self
        */ 
       public function setcorreo($correo)
       {
              $this->correo = $correo;

              return $this;
       }

       /**
        * Get the value of telefono
        */ 
        public function gettelefono()
       {
              return $this->telefono;
       }

       /**
        * Set the value of telefono
        *
        * @return  self
        */ 
       public function settelefono($telefono)
       {
              $this->telefono = $telefono;

              return $this;
       }

       /**
        * Get the value of nombreUsuario
        */ 
        public function getnombreUsuario()
       {
              return $this->nombreUsuario;
       }

       /**
        * Set the value of nombreUsuario
        *
        * @return  self
        */ 
       public function setnombreUsuario($nombreUsuario)
       {
              $this->nombreUsuario = $nombreUsuario;

              return $this;
       }

       /**
        * Get the value of contrasena
        */ 
        public function getcontrasena()
       {
              return $this->contrasena;
       }

       /**
        * Set the value of contrasena
        *
        * @return  self
        */ 
       public function setcontrasena($contrasena)
       {
              $this->contrasena = $contrasena;

              return $this;
       }

       /**
        * Get the value of fecha
        */ 
        public function getfecha()
       {
              return $this->fecha;
       }

       /**
        * Set the value of fecha
        *
        * @return  self
        */ 
       public function setfecha($fecha)
       {
              $this->fecha = $fecha;

              return $this;
       }

       /**
        * Get the value of imagen
        */ 
        public function getimagen()
       {
              return $this->imagen;
       }

       /**
        * Set the value of imagen
        *
        * @return  self
        */ 
       public function setimagen($imagen)
       {
              $this->imagen = $imagen;

              return $this;
       }

       /**
        * Get the value of reservacion
        */ 
        public function getreservacion()
       {
              return $this->reservacion;
       }

       /**
        * Set the value of reservacion
        *
        * @return  self
        */ 
       public function setreservacion($reservacion)
       {
              $this->reservacion = $reservacion;

              return $this;
       }

       public function __toString()
       {
              return $this->nombre ." ".$this->apellido.
              " (".$this->fechaNacimiento.",".$this->pais.")";
       }

       //CRUD
       public function crearUsuario($db){
              $usuarios = [
                     'id'=>$this->id,
                     'nombre'=>$this->nombre,
                     'apellido'=>$this->apellido,
                     'correo'=>$this->correo,
                     'telefono'=>$this->telefono,
                     'nombreUsuario'=>$this->nombreUsuario,
                     'contrasena'=>$this->contrasena,
                     'fecha'=>$this->fecha,
                     'imagen'=>$this->imagen,
                     'reservacion'=>$this->reservacion
              ];
              $result = $db
                 ->push($usuarios);
                 
              if($result->getKey() != null)
                 return '{"mensaje":"Registro almacenado","key":"'.$result->getKey().'"}';
              else
                 return '{"mensaje":"Error al guardar el registro"}';
        }
       
        public static function obtenerUsuarios($db){
               $result = $db->getSnapshot()
                  ->getValue();
       
               echo json_encode($result);
        }
       
        public static function obtenerUsuario($db, $indice){
               $result = $db->getChild($indice)
                  ->getValue();
       
               echo json_encode($result);
        }
       
        public function actualizarUsuario($db, $indice){
               $usuario = [
                     'id'=>$this->id,
                     'nombre'=>$this->nombre,
                     'apellido'=>$this->apellido,
                     'correo'=>$this->correo,
                     'telefono'=>$this->telefono,
                     'nombreUsuario'=>$this->nombreUsuario,
                     'contrasena'=>$this->contrasena,
                     'fecha'=>$this->fecha,
                     'imagen'=>$this->imagen,
                     'reservacion'=>$this->reservacion
               ];
               $result = $db
                  ->getChild($indice)
                  ->set($usuario);
               
               if($result->getKey() != null)
                  return '{"mensaje":"Registro actualizado","key":"'.$result->getKey().'"}';
               else
                  return '{"mensaje":"Error al actualizar el registro"}';
        }
       
        public static function eliminarUsuario($db, $indice){
              $db->getChild($indice) 
                 ->remove();
               echo '{"mensaje":"Se elimino el elemento '.$indice.'"}';
        }

    }
?>