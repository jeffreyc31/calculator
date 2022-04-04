let newDisplay = document.getElementById("interface");
let value = newDisplay.innerText;
const buttons = document.querySelectorAll('button');
let operation = undefined;
//check to see if operands have decimal, disables button when true
let hasDot = false;
let firstOperand = undefined;
let secondOperand = undefined;
//check to see if number on display was a calculation; if user presses number when true and with no operation, clears screen
let calculated = false;


//takes two parameters first & second and performs operation (operator) onto them, rounds to the 6th decimal if necessary
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
            if (b == 0) {
                answer = "Error"
            } else {
                answer = a / b;
            }
            break;
    }
    answer = answer.toFixed(6);
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
    let option = 0;
    let answer = undefined;
    let currentDisplay = newDisplay.innerText;
    let lastChar = currentDisplay.charAt(currentDisplay.length - 1);

    if (currentDisplay.length > 21) {
        newDisplay.innerText = "Error";
        buttons.forEach(button => button.disabled = true);
        document.getElementById("clear").disabled = false;
        return;
    }

    if (newNum == 'C') {
        newDisplay.innerText = '';
        firstOperand = undefined;
        secondOperand = undefined;
        operation = undefined;
        value = '';
        buttons.forEach(button => button.disabled = false);
        return;
    } else if (calculated == true && checkOperation(newNum) == false) {
        newDisplay.innerText = newNum;
        firstOperand = undefined;
        secondOperand = undefined;
        operation = undefined;
        value = '';
        calculated = false;
    } else if (calculated == true && checkOperation(newNum) == true) {
        calculated = false;
    } {

        //returns if user tries to input an operator before inputting number
        if (value == '' && checkOperation(newNum) == true) {
            return;
        }

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
                answer = operate(firstOperand, secondOperand, operation);
                firstOperand = answer;
                newDisplay.innerText = `${firstOperand}`;
                if (checkOperation(newNum) == true) {
                    operation = '';
                } else {
                    newNum = '';
                }
                secondOperand = undefined;
                hasDot = false;
                calculated = true;
                break;

            case 4:
                answer = operate(firstOperand, secondOperand, operation);
                firstOperand = answer;
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
    console.log(option);
}))