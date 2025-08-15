//Declaramos variables
var operandoa;
var operandob;
var operacion;
var expresion; //variable  para identicar la expresion

function init() {
  //variables
  let resultado = document.getElementById('resultado');
  let reset = document.getElementById('reset');
  let suma = document.getElementById('suma');
  let resta = document.getElementById('resta');
  let multiplicacion = document.getElementById('multiplicacion');
  let division = document.getElementById('division');
  let igual = document.getElementById('igual');
  let raiz = document.getElementById('raiz');
  let log = document.getElementById('log');
  let lognatural = document.getElementById('lognatural');
  let seno = document.getElementById('seno');
  let coseno = document.getElementById('coseno');
  let tangente = document.getElementById('tangente');
  let valorabsoluto = document.getElementById('valorabsoluto');
  let porcentaje = document.getElementById('porcentaje');
  let exponencial = document.getElementById('exponencial');
  let parentesisA = document.getElementById('parentesisA');
  let parentesisB = document.getElementById('parentesisB');
  let borrar = document.getElementById('borrar');

  let uno = document.getElementById('uno');
  let dos = document.getElementById('dos');
  let tres = document.getElementById('tres');
  let cuatro = document.getElementById('cuatro');
  let cinco = document.getElementById('cinco');
  let seis = document.getElementById('seis');
  let siete = document.getElementById('siete');
  let ocho = document.getElementById('ocho');
  let nueve = document.getElementById('nueve');
  let cero = document.getElementById('cero');
  //variable para guardar la operacion 

  resetear();

  //Eventos de click
  uno.onclick = function (e) {
    resultado.textContent = resultado.textContent + "1";
  }

  dos.onclick = function (e) {
    resultado.textContent = resultado.textContent + "2";
  }

  tres.onclick = function (e) {
    resultado.textContent = resultado.textContent + "3";
  }

  cuatro.onclick = function (e) {
    resultado.textContent = resultado.textContent + "4";
  }

  cinco.onclick = function (e) {
    resultado.textContent = resultado.textContent + "5";
  }

  seis.onclick = function (e) {
    resultado.textContent = resultado.textContent + "6";
  }

  siete.onclick = function (e) {
    resultado.textContent = resultado.textContent + "7";
  }

  ocho.onclick = function (e) {
    resultado.textContent = resultado.textContent + "8";
  }

  nueve.onclick = function (e) {
    resultado.textContent = resultado.textContent + "9";
  }

  cero.onclick = function (e) {
    resultado.textContent = resultado.textContent + "0";
  }

  reset.onclick = function (e) {
    resetear();
  }


  suma.onclick = function (e) {
    resultado.textContent = resultado.textContent + "+";
    console.log(resultado.textContent);
    // limpiar(); documente esto para que la operacion se concatene
  }

  resta.onclick = function (e) {
    resultado.textContent = resultado.textContent + "-";
    // limpiar();
  }

  multiplicacion.onclick = function (e) {
    resultado.textContent = resultado.textContent + "*";
    // limpiar();
  }

  division.onclick = function (e) {
    resultado.textContent = resultado.textContent + "/";
    // limpiar();
  }

  igual.onclick = function (e) {
    // El igual se encarga de resolver las operaciones 
    // operandob = resultado.textContent;
    // resolver();
    try {
      // Evalúa la operación completa mostrada en el campo
      resultado.textContent = resolver();
    } catch (error) {
      resultado.textContent = "Error";
    }
  };

  raiz.onclick = function () {
    operandoa = parseFloat(resultado.textContent); // Capturar número
    expresion = "raiz";
    digitar();
  };

  log.onclick = function () {
    operandoa = parseFloat(resultado.textContent);
    expresion = "log";
    digitar();
  };

  lognatural.onclick = function () {
    operandoa = parseFloat(resultado.textContent);
    expresion = "ln";
    digitar();
  };

  seno.onclick = function () {
    operandoa = parseFloat(resultado.textContent);
    expresion = "sin";
    digitar();
  };

  coseno.onclick = function () {
    operandoa = parseFloat(resultado.textContent);
    expresion = "cos";
    digitar();
  };

  tangente.onclick = function () {
    operandoa = parseFloat(resultado.textContent);
    expresion = "tan";
    digitar();
  };

  valorabsoluto.onclick = function () {
    operandoa = parseFloat(resultado.textContent);
    expresion = "|x|";
    digitar();
  };

  porcentaje.onclick = function () {
    operandoa = parseFloat(resultado.textContent);
    expresion = "%";
    digitar();
  };

  exponencial.onclick = function () {
    operandoa = parseFloat(resultado.textContent);
    expresion = "x^y";
    digitar();
  };

  parentesisA.onclick = function () {
    expresion = "(";
    digitar();
  };

  parentesisB.onclick = function () {
    expresion = ")";
    digitar();
  };

  borrar.onclick = function () {
    if (resultado.textContent.length > 0) {
      resultado.textContent = resultado.textContent.slice(0, -1);
    }else{
      resultado.textContent = "Campo vacio";
    }
  };

  function limpiar() {
    resultado.textContent = "";
  }

  function resetear() {
    resultado.textContent = "";
    operandoa = 0;
    operandob = 0;
    operacion = "";
  }

  // Se utilizan expresiones regulares para que se entiendan las palaras, cambiarlas a lenguaje JS y poder resolver la operación
  // Para esto se utiliza la página web https://www.regex101.com para idetnifivar lso patronens de las palaras como log, tan,cos, sin, ln
  //Se utliza la li breria Math como sustituto de las palabras huamanas y resolver la expresion en el orden correcto gracias al eval()
  function evaluarOperacion(cadenaOperacion) {
    cadenaOperacion = cadenaOperacion.replace(/log/g, "Math.log10");
    cadenaOperacion = cadenaOperacion.replace(/ln/g, "Math.log");
    cadenaOperacion = cadenaOperacion.replace(/sin/g, "Math.sin");
    cadenaOperacion = cadenaOperacion.replace(/cos/g, "Math.cos");
    cadenaOperacion = cadenaOperacion.replace(/tan/g, "Math.tan");
    cadenaOperacion = cadenaOperacion.replace(/√/g, "Math.sqrt");
    cadenaOperacion = cadenaOperacion.replace(/abs/g, "Math.abs");
    cadenaOperacion = cadenaOperacion.replace(/\^/g, "**");
    cadenaOperacion = cadenaOperacion.replace(/%/g, "/100");
    // cadenaOperacion = cadenaOperacion.replace(/\s/g, "*");//rememplzar espacio por multiplicacion
    // Evaluar la expresión

    // Cuando el primer elemento se transforma de " " (espacio) a "*" la calculadora posee una operación inválida,
    // esta condición permite que se limpie la multiplicación inválida inicial en caso que no inicie con un número entero
    // cadenaOperacion[0] === "*" ? cadenaOperacion = cadenaOperacion.slice(1) : cadenaOperacion = cadenaOperacion;
    // return eval(cadenaOperacion);
    if (cadenaOperacion[0] === "*" || cadenaOperacion[0] === " ") {
      cadenaOperacion = cadenaOperacion.slice(1);
    }
  
    // Intentar evaluar la expresión
    try {
      return eval(cadenaOperacion);
    } catch (e) {
      console.error("Error al evaluar la expresión:", e);
      return "Error";
    }
  }

  // Partiendo de la idea de la implementación original de resolver(), se coloca la función 
  // digitar() debido a que antes de dar resolución, se le da la posibilidad al usuario de digitar
  // toda la opreación antes de ser resuelta, teniendo como meta resolver operaciones combinadas complejas

  // Permite escribir la simbología y números dentro del texto de la calculadora anets de ser resuelta
  function digitar() {
    var str = "";
    switch (expresion) {
      case "raiz":
        str += "√";
        break;

      case "log":
        str += "log(";
        break;

      case "ln":
        str = "ln("
        break;

      case "sin":
        str = "sin("
        break;

      case "cos":
        str = "cos("
        break;

      case "tan":
        str = "tan("
        break;

      case "|x|":
        str = "abs(";
        break;

      case "%":
        str = "%";
        break;

      case "x^y":
        str = "^";
        break;

      case "(":
        str = "("
        break;

      case ")":
        str = ")";
        break;

      case "+":
        str = "+"
        break;

      case "-":
        str = "-";
        break;

      case "*":
        str = "*";
        break;

      case "/":
        str = "/";
        break;

      default:
        return;
    }
    //Condición ternaria para evitar creear espacios antes de los parentesis
    expresion == ")" 
    || expresion == "("
    || expresion == "^"
    ? resultado.textContent += str : resultado.textContent += " " + str;
  }

  // Función que llama a evaluar la operación y obtener el resultado final de la opreación compleja
  function resolver() {
    return evaluarOperacion(resultado.textContent);
  }

  // Se sustituye resolver() debido a que esta función solamente resolvía una expresión a la vez
  // y esto impide que se pueda escribir una operación completa con lenguaje humano y ser interpretado
  // como lenguaje de la máquina, siendo que el eval() no puede saber el significado de "log" por ejemplo

  // function resolver() { 
  //   var res = 0;
  //   switch (operacion) {
  //     case "+":
  //       res = parseFloat(operandoa) + parseFloat(operandob);
  //       break;

  //     case "-":
  //       res = parseFloat(operandoa) - parseFloat(operandob);
  //       break;

  //     case "*":
  //       res = parseFloat(operandoa) * parseFloat(operandob);
  //       break;

  //     case "/":
  //       res = parseFloat(operandoa) / parseFloat(operandob);
  //       break;
  //   }
  //   resetear();
  //   resultado.textContent = res;
  // }
}
