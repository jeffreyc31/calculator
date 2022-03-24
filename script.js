function operate(a, b, operator) {
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

let newDisplay = document.getElementById("interface");
let value = newDisplay.innerText;

const nums = document.querySelectorAll('.number')
nums.forEach(num => {
    num.addEventListener('click', function displayNum(e) {
        let newNum = num.innerText;
        value = `${value}${newNum}`;
        newDisplay.innerText = value;
    })
})