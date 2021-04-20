const {bot} = require('./robot')
const {onScan} = require('./events/onScan')
const {onLogin} = require("./events/onLogin")
const {onFriendShip} = require("./events/onFriendShip")
const {onMessage} = require("./events/onMessage")


// Start robot
bot.on('scan', onScan)
    .on('login', onLogin)
    .on('friendship', onFriendShip)
    .on('message', onMessage)
    .start()
