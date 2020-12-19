// const { response } = require("express");
const http = require("http");
const { parse } = require("path");
const url = require('url');
const hostname = "127.0.0.1";
const port = 8000;

http.createServer((req, res) => {
    var query = url.parse(req.url, true).query;
    var first = query.f;
    var second = query.s;
    var result;

    if(!(first && second)) {
        throwException('There are no values necessary to calculate', res);
    }
    if (first && second) {
        var parsedFirst = parseInt(first);
        var parsedSecond = parseInt(second);
        if(!(req.url.includes('/add?') || req.url.includes('/sub?') || req.url.includes('/mul?') || req.url.includes('/div?'))) {
            throwException('Bad query address', res);
        }
        if(!(Number.isInteger(parsedFirst) && Number.isInteger(parsedSecond))) {
            throwException('One of the numbers provided is not a number', res);
        } else {
            if (req.url.includes('/add?')) {
                result = parseInt(first) + parseInt(second);
                showResult(first, second, '+', result, res)
            } 
            if (req.url.includes('/sub?')) {
                result = parseInt(first) - parseInt(second);
                showResult(first, second, '-', result, res)
            } 
            if (req.url.includes('/mul?')) {
                result = parseInt(first) * parseInt(second);
                showResult(first, second, '*', result, res)
            } 
            if (req.url.includes('/div?')) {
                result = parseInt(first) / parseInt(second);
                showResult(first, second, '/', result, res)
            }
        }
    }
 }).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
 })

function calculateResult(firstValue, secondValue) {
    return parseInt(firstValue) / parse(secondValue)
}

 const throwException = (message, res) => {
    res.writeHead(400, {
        'Content-Type': 'text/html'
    });
    res.end(message);
 }

 const showResult = (first, second, operation, result, response) => {
    // var displayText = ;
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    response.end('<p>' + first + ' ' + operation + ' ' + second + ' = ' + result + '</p>');
    // response.end();
 }
