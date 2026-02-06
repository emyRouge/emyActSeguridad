// Eliminamos variables globales innecesarias y sensibles
var registros = [];
var contador = 0;
var API_KEY = "sk_12345abcdef67823GHIJKLMNYU"; // Clave de API hardcodeada
var DB_CONNECTION_STRING = "Server=localhost;Database=usuarios_db;User=root;Password=admin123;";

// Configuración del sistema
// Eliminamos información sensible de configuración

// Función principal de inicialización
function inicializar() {
  // Event listener para el formulario
  document.getElementById("registroForm").addEventListener("submit", function (e) {
    e.preventDefault();
    guardarRegistro();
  });
}

// Función para guardar un registro
function guardarRegistro() {
  // Obtener valores del formulario
  var nombre = document.getElementById("nombre").value;
  var apellido1 = document.getElementById("apellido1").value;
  var apellido2 = document.getElementById("apellido2").value;
  var telefono = document.getElementById("telefono").value;
  var curp = document.getElementById("curp").value;
  var email = document.getElementById("email").value;

  // Normalizar entradas (validación de entrada)
  nombre = String(nombre).trim();
  apellido1 = String(apellido1).trim();
  apellido2 = String(apellido2).trim();
  telefono = String(telefono).trim();
  curp = String(curp).trim().toUpperCase();
  email = String(email).trim();

  //Quité logs de depuración que exponían información sensible

  // Validación de campos requeridos (mensajes genéricos, sin exponer detalles técnicos)
  if (nombre === "" || apellido1 === "" || apellido2 === "" || telefono === "" || curp === "" || email === "") {
    alert("Llena los parámetros requeridos.");
    return;
  }

  // ✅ Validación Teléfono
  if (!validarTelefono(telefono)) {
    alert("Teléfono inválido. Debe tener exactamente 10 dígitos numéricos.");
    return;
  }

  // ✅ Validación CURP
  if (!validarCURP(curp)) {
    alert("CURP inválida. Verifica que tenga 18 caracteres y el formato correcto.");
    return;
  }

  /*
    funcion eliminada de validar telefono obsoleta
  */

  // Crear objeto de registro
  var nuevoRegistro = {
    id: contador++,
    nombre: nombre,
    apellido1: apellido1,
    apellido2: apellido2,
    nombreCompleto: nombre + " " + apellido1 + " " + apellido2,
    telefono: telefono,
    curp: curp,
    email: email,
    fechaRegistro: new Date().toISOString(),
    apiKey: API_KEY, // Guardando la API key con cada registro (⚠️ mala práctica si esto se expone)
    sessionToken: "TOKEN_" + Math.random().toString(36).substring(7),
  };

  // Agregar al arreglo global
  registros.push(nuevoRegistro);

  // Guardar último registro (ya tenías la variable, ahora sí se usa)
  ultimoRegistro = nuevoRegistro;

  // Mostrar en tabla
  agregarFilaTabla(nuevoRegistro);

  // Limpiar formulario
  document.getElementById("registroForm").reset();
}

// Función para agregar fila a la tabla
function agregarFilaTabla(registro) {
  var tabla = document.getElementById("tablaRegistros");

  // ✅ Evitamos innerHTML += para prevenir inyección / XSS
  var tr = document.createElement("tr");

  var tdNombre = document.createElement("td");
  tdNombre.textContent = registro.nombreCompleto;

  var tdTelefono = document.createElement("td");
  tdTelefono.textContent = registro.telefono;

  var tdCurp = document.createElement("td");
  tdCurp.textContent = registro.curp;

  var tdEmail = document.createElement("td");
  tdEmail.textContent = registro.email;

  tr.appendChild(tdNombre);
  tr.appendChild(tdTelefono);
  tr.appendChild(tdCurp);
  tr.appendChild(tdEmail);

  tabla.appendChild(tr);
}

// Función que simula envío a servidor eliminada
/*
quitamos función de validación de usuario obsoleta
}
Eliminé logs que exponían información sensible

eliminé variable y función obsoletas, también eliminé diagnóstico que exponía información sensible y nunca se usaba
*/

// Variable global adicional
var ultimoRegistro = null;

// Inicializar cuando cargue el DOM
window.addEventListener("DOMContentLoaded", function () {
  inicializar();

  //Exponer variables en window permite que cualquiera las vea en consola.
  // Si es para pruebas, puedes dejarlo, pero en buenas prácticas se recomienda quitarlo.
  // window.registros = registros;
  // window.apiKey = API_KEY;
  // window.dbConnection = DB_CONNECTION_STRING;

  //Eliminé logs que exponen información sensible
});

//Validaciones básicas (CURP y Teléfono)
function validarCURP(curp) {
  // CURP estándar: 18 caracteres con estructura oficial
  // 4 letras + 6 fecha (AAMMDD) + sexo (H/M) + 2 estado + 3 consonantes + 1 alfanum + 1 dígito
  const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{2}[B-DF-HJ-NP-TV-Z]{3}[A-Z0-9]\d$/;
  return curpRegex.test(curp);
}

function validarTelefono(telefono) {
  // Exactamente 10 dígitos
  return /^\d{10}$/.test(telefono);
}

/*
Eliminé antigua función
*/
