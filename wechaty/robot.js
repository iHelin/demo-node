const { Wechaty } = require('wechaty') // import { Wechaty } from 'wechaty'
// const { PuppetPadplus } = require("wechaty-puppet-padplus") // padplus协议包
const config = require("./config") // 配置文件
const token = config.token;
const bot = new Wechaty({
    puppet: 'wechaty-puppet-hostie',
    puppetOptions: {
        token,
    }
});
module.exports = {
    bot: bot
}
