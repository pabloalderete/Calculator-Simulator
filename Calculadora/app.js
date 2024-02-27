//VARIABLES
const buttonNumbers = document.getElementsByName('data-number');
const buttonOperation = document.getElementsByName('data-operation');
const buttonRestart = document.getElementsByName('data-restart')[0];
const buttonEqual = document.getElementsByName('data-equal')[0];
var resultado = document.getElementById('resultado');
var actualOperation = '';
var formerOperation = '';
var operation = undefined;

//FUNCTIONS
//->agrega un numero al display
function addNumber(number){
    actualOperation = actualOperation.toString() + number.toString();
    refreshDisplay();
}

function calculate(){
    var calculo;
    const former = parseFloat(formerOperation);
    const actual = parseFloat(actualOperation);
    if(isNaN(former) || isNaN(actual))return;
    switch(operation){
        case '+':
            calculo = former + actual;
            break;
        case '-':
            calculo = former - actual;
            break;
        case '/':
            calculo = former / actual;
            break;
        case 'x':
            calculo = former * actual;
            break;
        default:
            return;            
    }
    actualOperation = calculo;
    operation = undefined;
    formerOperation = '';
}

//->selecciona la operacion que se quiere hacer entre 2 valores
function selectOperation(operator){
    if(actualOperation === '') return;
    if(formerOperation !== ''){
        calculate();
    }
    operation = operator.toString();
    formerOperation = actualOperation;
    actualOperation = '';
}

//->actualiza el valor del display
function refreshDisplay(){
    resultado.value = actualOperation;
}

//->limpia los valores de la calculadora / resetea
function clear(){
    actualOperation = '';
    formerOperation = '';
    operation = undefined;
}

//EVENTS
//->detecta el numero seleccionado
buttonNumbers.forEach(function(button){
    button.addEventListener('click', function(){
        addNumber(button.innerText);
    })  
});

//->detecta el operador seleccionado
buttonOperation.forEach(function(button){
    button.addEventListener('click', function(){
        selectOperation(button.innerText);
    })  
});

//->detecta el boton de igual seleccionado
buttonEqual.addEventListener('click', function(){
    calculate();
    refreshDisplay();
});

//->detecta el boton de C seleccionado para resetear valores y display
buttonRestart.addEventListener('click', function(){
    clear();
    refreshDisplay();
});
