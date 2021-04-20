const fs = require('fs');
const path = require('path')


let hello = fs.readFileSync(path.join(__dirname, 'hello.txt'));

console.log(hello.toString());


let fd = fs.openSync('hi.txt', 'w');

console.log(fd);
fs.writeSync(fd, '今天天气不错');


fs.writeFileSync('ho.txt', '今天天气不错');

fs.closeSync(fd);

