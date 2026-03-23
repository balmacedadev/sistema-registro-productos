INSTRUCCIONES DE INSTALACIÓN – SISTEMA REGISTRO DE PRODUCTOS

REQUISITOS:
* Servidor local (XAMPP o similar)
* PHP 7.4 o superior
* PostgreSQL (se usó versión: 18)
* pgAdmin 4 (opcional, para gestión visual de la base de datos)
* Navegador web (Chrome recomendado)

PASOS DE INSTALACIÓN:
1. Clonar o copiar el proyecto en la carpeta del servidor local:
   Ubicación:
   C:\xampp\htdocs\sistema-registro-productos

2. Iniciar servicios en XAMPP:
   * Apache
   * (PostgreSQL debe estar iniciado por separado si aplica)

3. Crear la base de datos:
   Abrir pgAdmin o consola de PostgreSQL y ejecutar:
   CREATE DATABASE prueba_db;

4. Crear las tablas:
   Ejecutar el script SQL proporcionado para crear las siguientes tablas:
   * bodegas
   * sucursales
   * monedas
   * materiales
   * productos
   * producto_material

5. Insertar datos iniciales:
   Ejecutar el script (datos-iniciales.sql) para poblar:
   * bodegas
   * sucursales
   * monedas
   * materiales

6. Configurar conexión a base de datos:
   Editar el archivo: 
   config/database.php

   Verificar los siguientes datos:
   * host
   * nombre de base de datos (prueba_db)
   * usuario
   * contraseña

7. Ejecutar el proyecto:
   Abrir navegador y acceder a:
   http://localhost/sistema-registro-productos

NOTA:
   * Se adjuntan los modelos ERD y UML para una mejor comprensión del sistema
   
AUTOR:
Manuel Bañados
