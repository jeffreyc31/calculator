let newDisplay = document.getElementById("interface");
let value = newDisplay.innerText;
const buttons = document.querySelectorAll('button');
let operation = undefined;
let hasDot = false;
let firstOperand = undefined;
let secondOperand = undefined;

//takes two parameters first & second and performs operation (operator) onto them
function operate(first, second, operator) {
    let a = parseFloat(first);
    let b = parseFloat(second);
    let answer;
    switch (operator) {
        case "+":
            answer = a + b;
            break;
        case "-":
            answer = a - b;
            break;
        case "x":
            answer = a * b;
            break;
        case "/":
            answer = a / b;
            break;
    }
    return answer;
}


//function to check if the button clicked is an operation
function checkOperation(input) {
    let check = false;
    if (input == '+' || input == '-' || input == '/' || input == 'x') {
        check = true;
    }
    return check;
}


//add event listener to each button on calculator
buttons.forEach(button => button.addEventListener('click', function displayNum(e) {
    let newNum = button.innerText;
    let currentDisplay = newDisplay.innerText;
    let lastChar = currentDisplay.charAt(currentDisplay.length - 1);
    let option = 0;

    if (newNum == 'C') {
        newDisplay.innerText = '';
        firstOperand = undefined;
        secondOperand = undefined;
        operation = undefined;
        value = '';
    } else {



        //returns if user tries to input an operator before inputting number
        if (value == '' && checkOperation(newNum) == true) {
            return;
        }

        //returns if user tries to use multiple decimal points
        // if (currentDisplay.includes('.') == true && newNum == '.') {
        //     return;
        // }

        //returns if user tries to input consecutive operators
        if (checkOperation(newNum) == true && checkOperation(lastChar) == true) {
            return;
        }

        //returns if user presses equals before any numbers 
        if (newNum == '=' && firstOperand == undefined) {
            return;
        }

        //returns if user presses equals with only one operand
        if (newNum == '=' && secondOperand == undefined) {
            return;
        }

        // the following if-statements check what conditions the calculator is in. the function will perform 
        // different actions based on whether the user inputs a number or operation, as well as if the first and/or second
        // operand has been declared

        //if user inputs an operation with none on screen, stores first operand and the operation
        if (checkOperation(newNum) == true && checkOperation(currentDisplay) == false) {
            option = 1;
        }

        //user inputs a number after first operand and operation is stored; starts storing second operand
        if (firstOperand !== undefined && checkOperation(newNum) == false) {
            option = 2;
        }

        //user inputs equals sign with first operand , second operand, and operation stored; calls operate
        if (newNum == '=' && firstOperand !== undefined && secondOperand !== undefined) {
            option = 3;
        }

        //user inputs operation with first operand, second operand and PREVIOUS operation stored; calls operate and stores new operation 
        if (checkOperation(newNum) == true && firstOperand !== undefined && secondOperand !== undefined) {
            option = 4;
        }


        switch (option) {
            case 0:
                if (currentDisplay.includes('.') == true && newNum == '.') {
                    return;
                }

                value = `${value}${newNum}`;
                newDisplay.innerText = value;
                break;

            case 1:
                if (firstOperand == undefined) {
                    firstOperand = value;
                }
                operation = newNum;
                newDisplay.innerText = `${firstOperand}${operation}`;
                break;

            case 2:
                if (newNum == '.' && hasDot == true) {
                    return;
                } else if (hasDot == false && newNum == '.') {
                    hasDot = true;
                }

                if (secondOperand == undefined) {
                    secondOperand = newNum;
                } else {
                    secondOperand = `${secondOperand}${newNum}`
                }
                value = `${firstOperand}${operation}${secondOperand}`;
                newDisplay.innerText = value;
                console.log(firstOperand + ',' + operation + ',' + secondOperand);
                break;

            case 3:
                if (secondOperand == undefined) {
                    secondOperand = 0;
                }
                firstOperand = operate(firstOperand, secondOperand, operation);
                newDisplay.innerText = `${firstOperand}`;
                if (checkOperation(newNum) == true) {
                    operation = '';
                } else {
                    newNum = '';
                }
                secondOperand = undefined;
                hasDot = false;
                break;

            case 4:
                firstOperand = operate(firstOperand, secondOperand, operation);
                newDisplay.innerText = `${firstOperand}`;
                if (checkOperation(newNum) == true) {
                    operation = newNum;
                } else {
                    newNum = '';
                }
                secondOperand = undefined;
                hasDot = false;
                break;
        }
    }
}))