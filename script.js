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