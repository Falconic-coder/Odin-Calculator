let firstNumber;
let lastNumber;
let operator;
let result;

let ButtonPressed;
let operationString = "";


function updateDisplay(string){
    document.querySelector(".screen-current").textContent = string;  
}


function calculate(string){
    let index = -1;

    let operators = ["/", "*", "+", "-"];

    for(operator of operators){
        index = string.lastIndexOf(operator);

        if(index != -1){
            operator = operator;
            break;
        };
    }

    firstNumber = parseFloat(string.substring(0, index).trim());
    lastNumber = parseFloat(string.substring(index+1).trim());

    if(errors(operator, lastNumber))
    {
        alert("ERRROR\nDivide by zero.");
        operationString = operationString.substring(0, operationString.length-1);
    }

    if(operator === "/")
        result = firstNumber / lastNumber;
    else if(operator === "*")
        result = firstNumber * lastNumber;
    else if(operator === "-")
        result = firstNumber - lastNumber;
    else
        result = firstNumber + lastNumber;
}


function errors(operator, lastNumber){
    return lastNumber === 0 && operator === "/";
}


function main(ButtonPressed){


    if (ButtonPressed === '+' || ButtonPressed === '-' || ButtonPressed === '*' || ButtonPressed === '/') 
    {
        if(operationString === "")
            operationString = "0"+ButtonPressed;
        else
        {
            if(!checkForOperator(operationString))
                operationString += ButtonPressed;
            else
                operationString = `${result}${ButtonPressed}`;
        }
    }

    else if(ButtonPressed === "=")
    {
        calculate(operationString);
        if(!isNaN(result))
        {
            checkResultVar();
            operationString = result.toString();
        }
    }

    else 
    {
        operationString += ButtonPressed;
        if(checkForOperator(operationString))
        {    
            calculate(operationString);
            checkResultVar();
        }
    }
    updateDisplay(operationString);
}


function onButtonClick(){
    let btns = document.querySelectorAll("button");

    for(let i=2; i<btns.length; i++)
        btns[i].addEventListener("click", (e) => {
            ButtonPressed = e.target.textContent;
            main(ButtonPressed);
        })
}

onButtonClick();


function checkForOperator(string){
    return string.includes("/") || string.includes("*")  || string.includes("+") || string.includes("-");
}


function checkResultVar(){
    if(result.toString().length >= 5)
        result = parseFloat(result.toString().substring(0, 5));
}

window.addEventListener("keyup", (e)=>{
    if(e.key === "Enter")
    {
        ButtonPressed = "=";
        main(ButtonPressed);
    }

    if(e.key === ".")
    {
        ButtonPressed = ".";
        main(ButtonPressed);
    }

    if(!isNaN(e.key))
    {
        ButtonPressed = parseFloat(e.key);
        main(ButtonPressed);
    }
    
    if(checkForOperator(e.key))
    {
        ButtonPressed = e.key;
        main(ButtonPressed);
    }

    if(e.key === "Backspace" && operationString.length > 1)
    {
        operationString = operationString.substring(0, operationString.length-1);
        updateDisplay(operationString);
    }    
    
})