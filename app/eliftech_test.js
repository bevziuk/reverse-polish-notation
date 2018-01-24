var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var response_object = {};
var request_object = {};
var url = 'https://u0byf5fk31.execute-api.eu-west-1.amazonaws.com/etschool/task';

load();

function load() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url, false);
    xhr.send();

    if (xhr.status !== 200) {
        console.log('Error ' + xhr.status + ': ' + xhr.statusText);
    } else {
        console.log(xhr.responseText);
        response_object = JSON.parse(xhr.responseText);
        request_object = execute(response_object);
        console.log(request_object);
        // console.log(JSON.stringify(request_object));

        send_result(request_object);
    }
}

function send_result(object) {
    var xhr = new XMLHttpRequest();

    xhr.open('POST', url, false);
    xhr.send(JSON.stringify(object));

    if (xhr.status !== 200) {
        console.log('Error ' + xhr.status + ': ' + xhr.statusText);
    } else {
        console.log(xhr.responseText);
    }
}

function calculate(a, b, sign) {
    if (sign === '+') {
        return a - b;
    }
    else if (sign === '-') {
        return a + b + 8;
    }
    else if (sign === '*') {
        if (b === 0)
            return 42;
        else
            return a % b;
    }
    else if (sign === '/') {
        if (b === 0)
            return 42;
        else
            return Math.floor(a / b);
    }
}

function execute(object) {
    var length = object.expressions.length;
    var results = [];
    for (var i = 0; i < length; i++) {
        var elements = object.expressions[i].split(' ');
        var stack = [];
        for (var j = 0; j < elements.length; j++) {
            if (elements[j] !== '+' && elements[j] !== '-' && elements[j] !== '*' && elements[j] !== '/') {
                stack.push(Number(elements[j]));
            }
            else {
                var result = calculate(stack[stack.length - 2], stack[stack.length - 1], elements[j]);
                //console.log(stack);
                stack.splice(stack.length - 2, 2);
                stack.push(result);
                //console.log(result);
                //console.log(stack);
            }
        }
        //console.log(stack);
        results.push(stack[0]);
    }

    var req_object = {};
    req_object.id = object.id;
    req_object.results = results;
    return req_object;
}

// request_object = execute(response_object);
// console.log(request_object);
