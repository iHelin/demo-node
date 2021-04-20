const { Friendship } = require("wechaty")
const config = require("../config")

/**
 * 添加好友
 *
 * @param {*} friendship
 */
async function onFriendShip(friendship) {
    let logMsg
    try {
        logMsg = "添加好友" + friendship.contact().name()
        switch (friendship.type()) {
            // 1. 新的好友请求
            case Friendship.Type.Receive:
                await friendship.accept()
                break
            //好友关系确认
            case Friendship.Type.Confirm:
                await new Promise(r => setTimeout(r, 1000))
                await friendship.contact().say(config.personal.welcome)
                break
        }
    } catch (e) {
        logMsg = e.message
        console.log("onFriendShip error", logMsg)
    }
}

module.exports = {
    onFriendShip: onFriendShip
}
