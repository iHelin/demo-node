// const schedule = require('node-schedule')
const config = require("../config")
// const os = require('os')
// const { queryUserData } = require("../db/walletDao")
// const { queryTokenBalance } = require("../utils/walletUtil")
const { getOutRoom } = require("../events/onMessage")
const { bot } = require('../robot')
// const token = require("../token")

/**
 * 检测用户
 *
 * @param {*} groupRoom 房间ID
 * @param {*} tokenType 房间类型
 * @param {*} minToken 最小持仓
 * @returns 是否需要被移除群聊
 */
async function checkTokenRunner(tokenType, minToken, precision) {
    let room = await bot.Room.find({ id: token[tokenType].room })
    await room.sync();
    let allIds = room.payload.memberIdList
    for (let i = 0; i < allIds.length; i++) {
        const user_id = allIds[i];
        const data = await queryUserData(user_id, tokenType);
        const contact = await bot.Contact.find({ id: user_id });
        // 剔除未签名
        if (data.length == 0 && config.self != user_id) {
            await room.say(config.personal.noSignInGroup, contact);
            await getOutRoom(contact, room);
            return;
        } else if (config.self != user_id) {
            let userData = data[0]
            await queryTokenBalance(userData.wallet_address, tokenType, precision).then(async (result) => {
                console.log(new Date().toLocaleString(),tokenType,result);
                // 剔除持币不足
                if (result.balance < minToken) {
                    await getOutRoom(contact, room);
                    return;
                }
            }).catch(err => { console.log("onlogin error", err) })
        }
    }
}

/**
 * 检测用户
 *
 * @param {*} tokenType_1
 * @param {*} tokenType_2
 * @param {*} minToken_1
 * @param {*} minToken_2
 * @param {*} precision_1
 * @param {*} precision_2
 */
async function checkTwoTokenRunner(tokenType_1, tokenType_2, minToken_1, minToken_2, precision_1, precision_2) {
    let room = await bot.Room.find({ id: token[tokenType_1].room });
    await room.sync();
    let allIds = room.payload.memberIdList;
    for (let i = 0; i < allIds.length; i++) {
        let user_id = allIds[i];
        let data_1 = await queryUserData(user_id, tokenType_1);
        let data_2 = await queryUserData(user_id, tokenType_2);
        let contact = await bot.Contact.find({ id: user_id });
        let qualification_1 = true;
        let qualification_2 = true;
        // 剔除未签名
        if (data_1.length == 0 && data_2.length == 0 && config.self != user_id) {
            await room.say(config.personal.noSignInGroup, contact);
            await getOutRoom(contact, room);
            return;
        }

        if (data_1.length != 0 && config.self != user_id) {
            let userData_1 = data_1[0];
            await queryTokenBalance(userData_1.wallet_address, tokenType_1, precision_1).then(async (result) => {
                console.log(new Date().toLocaleString(),user_id,tokenType_1,result);
                if (result.balance < minToken_1) {
                    qualification_1 = false;
                }
            }).catch(err => { console.log("onlogin error", err) })
        }

        if (data_2.length != 0 && config.self != user_id) {
            let userData_2 = data_2[0];
            await queryTokenBalance(userData_2.wallet_address, tokenType_2, precision_2).then(async (result) => {
                console.log(new Date().toLocaleString(),user_id,tokenType_2,result);
                if (result.balance < minToken_2) {
                    qualification_2 = false;
                }
            }).catch(err => { console.log("onlogin error", err) })
        }

        if (!(qualification_1||qualification_2)) {
            await room.say(config.personal.cantPassInGroup, contact);
            await getOutRoom(contact, room);
        }

    }
}

/**
 * 登录
 *
 * @param {*} user 用户
 */
async function onLogin(user) {
    console.log(`机器人 ${user} 登录了`)
    // 登陆后创建定时任务
    // schedule.scheduleJob(config.time, async () => {
    //     try {
    //         console.log("Job start");
    //         console.log('系统内存总数：%d MB', os.totalmem() / 1024 / 1024);
    //         console.log('可用内存：%d MB', os.freemem() / 1024 / 1024);
    //         //TODO: 读取token.js，遍历生成函数
    //         checkTokenRunner("karma", 200, 4);
    //         checkTokenRunner("shill", 2333, 18);
    //         checkTokenRunner("anc", 1, 18);
    //         checkTokenRunner("api3", 5, 18);
    //         checkTokenRunner("donut", 10000, 18);
    //         checkTokenRunner("ton", 100000, 18);
    //         checkTwoTokenRunner("loong", "loong_nft", 100, 1, 18, 0);
    //         checkTwoTokenRunner("mcb", "mcb_admin", 999, 1, 18, 0);
    //         console.log('系统内存总数：%d MB', os.totalmem() / 1024 / 1024);
    //         console.log('可用内存：%d MB', os.freemem() / 1024 / 1024);
    //         console.log("Job end");
    //     } catch (e) {
    //         console.log("checkTokenRunner Token ERROR:  ", e.message)
    //     }
    // })
}

module.exports = {
    onLogin: onLogin
}
