const buttonContainer = document.querySelector(".button-container");
const display = document.querySelector(".display");
const operadores = ['+', '-', 'x', '/'];
let termino1 = 0;
let operador = '';
let termino2 = '';

const suma = (a, b) => a + b;
const resta = (a, b) => a - b;
const multiplicacion = (a, b) => a * b;
const division = (a, b) => (b !== 0) ? a / b : 'Error';

const borrar = () => {
  display.innerText = 0;
  termino1 = '';
  operador = '';
  termino2 = '';
};

const borrarUltimo = () => {
  display.innerText = display.innerText.slice(0, -1);
};

const calcular = (operador, a, b) => {
  switch (operador) {
    case '+':
      return suma(a, b);
    case '-':
      return resta(a, b);
    case 'x':
      return multiplicacion(a, b);
    case '/':
      return division(a, b);
    default:
      return 'Error';
  }
};

const checkNull = (termino)=>{
  if (termino === ''){
    return true; 
  } else {
    return false;
  }
}

// Si la pantalla esta vacia muestra 0.
display.innerText = display.innerText === '' ? 0 : display.innerText;

buttonContainer.addEventListener("click", (event) => {
  // Controla que solo traiga la info de los botones.
  if (event.target.tagName === 'BUTTON') {
    const buttonText = event.target.innerText;
    // Si presiona un numero lo escribe en la pantalla.
    if (!isNaN(parseInt(buttonText))) {
      // Si la pantalla muestra 0, lo reemplaza por el numero presionado.
      display.innerText = display.innerText === '0' ? buttonText :
      display.innerText += buttonText;
    } else if (buttonText === 'C') {
      borrar();
    } else if (buttonText === '←') {
      borrarUltimo();
    } 
    // Si presiona un operador y el operador no esta cargado, hace una operacion simple.
    else if (operadores.includes(buttonText)) {
      if (checkNull(operador)) {
        operador = buttonText;
        termino1 = parseInt(display.innerText);
      }
      else {
        const result = calcular(operador, termino1, parseInt(termino2))
        display.innerText = result ;
        termino1 = result ;
        operador = buttonText;
        termino2 = '';
      }
    }

    // Si presiona un numero, el operador y el termino1 estan cargados, carga el termino2.
    if (!checkNull(operador) && !checkNull(termino1) && !isNaN(parseInt(buttonText))) {
      display.innerText = display.innerText === '0' ? buttonText :
      termino2 += buttonText;
    }

    // Si presiona el igual, calcula el resultado.
    if (buttonText === '=') {
      const result = calcular(operador, termino1, parseInt(termino2))
      display.innerText = result ;
      termino1 = result ;
      operador = '';
      termino2 = '';
    }

  }
});
