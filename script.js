const buttonContainer = document.querySelector(".button-container");
const display = document.querySelector(".display");
const operadores = ['+', '-', 'x', '/'];
let terminos = ['0', '', ''];

const suma = (a, b) => a + b;
const resta = (a, b) => a - b;
const multiplicacion = (a, b) => a * b;
const division = (a, b) => (b !== 0) ? a / b : 'Error';

const borrar = () => {
  display.innerText = "";
  terminos = ['0', '', ''];
};

const borrarUltimo = () => {
  display.innerText = display.innerText.slice(0, -1);
};

const calcular = (operacion, a, b) => {
  switch (operacion) {
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

buttonContainer.addEventListener("click", (event) => {
  if (event.target.tagName === 'BUTTON') {
    const buttonText = event.target.innerText;

    if (!isNaN(parseInt(buttonText))) {
      display.innerText += buttonText;
    } else if (buttonText === 'C') {
      borrar();
    } else if (buttonText === '←') {
      borrarUltimo();
    } else if (operadores.includes(buttonText)) {
      if (terminos[0].length > 0 && terminos[1].length > 0 && display.innerText.length > 0) {
        terminos[2] = display.innerText;
        const resultadoParcial = calcular(terminos[1], parseInt(terminos[0]), parseInt(terminos[2]));
        display.innerText = resultadoParcial;
        terminos = [resultadoParcial, buttonText, ''];
      } else if (terminos[0].length > 0 && display.innerText.length > 0) {
        terminos[0] = display.innerText;
        terminos[1] = buttonText;
        display.innerText = '';
      }
    } else if (buttonText === '=') {
      if (terminos[0].length > 0 && terminos[1].length > 0 && display.innerText.length > 0) {
        terminos[2] = display.innerText;
        display.innerText = '';
        const resultadoFinal = calcular(terminos[1], parseInt(terminos[0]), parseInt(terminos[2]));
        if (isNaN(resultadoFinal)) {
          display.innerText = 'Error';
        } else {
          display.innerText = resultadoFinal;
          terminos = [resultadoFinal, '', ''];
        }
      }
    }
  }
});
