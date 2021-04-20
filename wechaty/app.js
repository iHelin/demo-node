const {Wechaty} = require('wechaty') // import { Wechaty } from 'wechaty'
// const token = 'puppet_padplus_a3a8660ae65872b5';
const token = 'puppet_donut_2cdaef0013a6b5e0';
Wechaty.instance({
    name: 'test',
    puppetOptions: {token}
}).on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`))
    .on('login', user => console.log(`User ${user} logged in`))
    .on('message', message => console.log(`Message: ${message}`))
    .start();
