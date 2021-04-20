const config = require("../config");
// const {queryTokenBalance} = require("../utils/walletUtil");
// const {queryUserData} = require("../db/walletDao");
const {bot} = require("../robot");
// const token = require("../token");
// const {createSign} = require("../utils/sign");

async function onMessage(msg) {
    let room = msg.room();
    let from = msg.talker();
    await from.sync();
    let text = msg.text();
    let wexin = from.id;
    if (!from) {
        return;
    }

    // if (room) {
    //     if (await msg.mentionSelf()) {
    //         if (text.trim().split(" ").length == 2) {
    //             if (text.trim().split(" ")[1] == config.room.admin) {
    //                 await room.say(room.id);
    //             }
    //         }
    //     }
    // } else if (!config.blacklist.includes(wexin)) {
    //     console.log(new Date().toLocaleString(), wexin, text);
    //     try {
    //         switch (text.toUpperCase()) {
    //             // 多群组 根据确认码 进群
    //             //TODO: 读取token.js，遍历生成函数
    //             case token["karma"].code: // @K
    //                 await passAndJoinGroup(msg, "karma").catch((e) =>
    //                     console.log("@K join ERROR", e)
    //                 );
    //                 return;
    //             case token["shill"].code: // @S
    //                 await passAndJoinGroup(msg, "shill").catch((e) =>
    //                     console.log("@S join ERROR", e)
    //                 );
    //                 return;
    //             case token["anc"].code: // @A
    //                 await passAndJoinGroup(msg, "anc").catch((e) =>
    //                     console.log("@A join ERROR", e)
    //                 );
    //                 return;
    //             case token["api3"].code: // @API3
    //                 await passAndJoinGroup(msg, "api3").catch((e) =>
    //                     console.log("@API3 join ERROR", e)
    //                 );
    //                 return;
    //             case token["donut"].code: // @DONUT
    //                 await passAndJoinGroup(msg, "donut").catch((e) =>
    //                     console.log("@DONUT join ERROR", e)
    //                 );
    //                 return;
    //             case token["ton"].code: // @TON
    //                 await passAndJoinGroup(msg, "ton").catch((e) =>
    //                     console.log("@TON join ERROR", e)
    //                 );
    //                 return;
    //             case token["loong"].code: // @L
    //                 await passAndJoinGroup(msg, "loong").catch((e) =>
    //                     console.log("@L join ERROR", e)
    //                 );
    //                 return;
    //             case token["loong_nft"].code: // @LOONG_NFT
    //                 await passAndJoinGroup(msg, "loong_nft").catch((e) =>
    //                     console.log("@BDH2020 join ERROR", e)
    //                 );
    //                 return;
    //             case token["mcb"].code: // @MCB
    //                 await passAndJoinGroup(msg, "mcb").catch((e) =>
    //                     console.log("@MCB join ERROR", e)
    //                 );
    //                 return;
    //             case token["mcb_admin"].code: // @MCBADMIN
    //                 await passAndJoinGroup(msg, "mcb_admin").catch((e) =>
    //                     console.log("@MCBADMIN join ERROR", e)
    //                 );
    //                 return;
    //
    //             // 命令识别
    //             //TODO: 读取token.js，遍历生成函数
    //             case token["karma"].secret:
    //                 sendCode(msg, "karma");
    //                 return;
    //             case token["shill"].secret:
    //                 sendCode(msg, "shill");
    //                 return;
    //             case token["anc"].secret:
    //                 sendCode(msg, "anc");
    //                 return;
    //             case token["api3"].secret:
    //                 sendCode(msg, "api3");
    //                 return;
    //             case token["donut"].secret:
    //                 sendCode(msg, "donut");
    //                 return;
    //             case token["ton"].secret:
    //                 sendCode(msg, "ton");
    //                 return;
    //             case token["loong"].secret:
    //                 sendCode(msg, "loong");
    //                 return;
    //             case token["loong_nft"].secret:
    //                 sendCode(msg, "loong_nft");
    //                 return;
    //             case token["mcb"].secret:
    //                 sendCode(msg, "mcb");
    //                 return;
    //             case token["mcb_admin"].secret:
    //                 sendCode(msg, "mcb_admin");
    //                 return;
    //             case "RULE":
    //                 showGroupRule(msg);
    //                 break;
    //             case "HELP":
    //                 showHelpInfo(msg);
    //                 break;
    //             default:
    //                 msg.say(config.personal.others);
    //                 return;
    //         }
    //     } catch (e) {
    //         console.log("Message Error", e.message);
    //     }
    // }
}

/**
 * Rule
 *
 * @param {*} msg
 */
function showGroupRule(msg) {
    const rule = config.personal.rule;
    msg.say(rule);
}

/**
 * Help
 *
 * @param {*} msg
 */
function showHelpInfo(msg) {
    const help = config.personal.help;
    msg.say(help);
}

/**
 * 是否在群
 *
 * @param {*} msg
 * @param {*} roomId
 */
// async function isGroup(msg, roomId) {
//   const contact = await bot.Contact.find({ id: msg.payload.fromId });
//   const room = await bot.Room.find({ id: roomId });
//   await room.sync();
//   let inGroup = await room.has(contact);
//   return inGroup;
// }

/**
 * 是否签名
 *
 * @param {*} msg
 * @param {*} tokenType
 */
async function isSigned(msg, tokenType) {
    let userData = await queryUserData(msg.payload.fromId, tokenType);
    if (userData.length == 0) {
        return false;
    } else {
        return true;
    }
}

/**
 * 是否是VIP
 *
 * @param {*} msg
 * @param {*} tokenType
 * @param {*} minToken
 * @param {*} precision
 */
async function isVip(msg, tokenType, minToken, precision) {
    var isVip = false;
    var userData = await queryUserData(msg.payload.fromId, tokenType);
    if (userData.length != 0) {
        var data = await queryTokenBalance(
            userData[0].wallet_address,
            tokenType,
            precision
        ).catch((error) => {
            console.log("queryTokenBalance error", error);
        });
        console.log(new Date().toLocaleString(), "Holder: ", data);
        // 检测持币量
        if (data.balance >= minToken) {
            isVip = true;
        }
    }
    return isVip;
}

/**
 * 加群
 *
 * @param {*} msg
 * @param {*} groupRoom
 */
async function joinGroup(msg, groupRoom) {
    let room = await bot.Room.find({id: groupRoom});
    try {
        await room.add(msg.talker());
        setTimeout(
            (_) => room.say(config.room.roomJoinReply, msg.talker()),
            5 * 1000
        );
    } catch (e) {
        console.error(e);
    }
}

/**
 * 踢出
 *
 * @param {*} contact
 * @param {*} room
 */
async function getOutRoom(contact, room) {
    try {
        await room.del(contact); // 踢出
    } catch (e) {
        console.log("Error " + e.stack);
    }
}

/**
 * 验资，进群
 *
 * @param {*} msg
 * @param {*} tokenType
 */
async function passAndJoinGroup(msg, tokenType) {
    console.log(msg.payload.fromId, token[tokenType].room);
    // let inGroupStatus = await isGroup(msg, token[tokenType].room);
    // 是否在群里
    // if (!inGroupStatus) {
    let signStatus = await isSigned(msg, tokenType);
    // 是否在签名
    if (signStatus) {
        let userStatus = await isVip(
            msg,
            tokenType,
            token[tokenType].minToken,
            token[tokenType].precision
        );
        // 是否是VIP
        if (userStatus) {
            joinGroup(msg, token[tokenType].room);
            msg.say(config.personal.canPass);
        } else {
            msg.say(config.personal.cantPass);
        }
    } else {
        msg.say(config.personal.noSign);
    }
    // } else {
    //   msg.say(config.personal.joined);
    // }
}

/**
 * 验资，进群
 *
 * @param {*} msg
 * @param {*} tokenType
 */
async function passTwoAndJoinGroup(msg, tokenType_1, tokenType_2) {
    console.log(msg.payload.fromId, token[tokenType_1].room);
    console.log(msg.payload.fromId, token[tokenType_2].room);
    // let inGroupStatus = await isGroup(msg, token[tokenType_1].room);
    // 是否在群里
    // if (!inGroupStatus) {
    let signStatus_1 = await isSigned(msg, tokenType_1);
    let signStatus_2 = await isSigned(msg, tokenType_2);
    // 是否在签名
    if (signStatus_1 || signStatus_2) {
        let userStatus_1 = await isVip(
            msg,
            tokenType_1,
            token[tokenType_1].minToken,
            token[tokenType_1].precision
        );
        let userStatus_2 = await isVip(
            msg,
            tokenType_2,
            token[tokenType_2].minToken,
            token[tokenType_2].precision
        );
        // 是否是VIP
        if (userStatus_1 || userStatus_2) {
            joinGroup(msg, token[tokenType_1].room);
            msg.say(config.personal.canPass);
        } else {
            msg.say(config.personal.cantPass);
        }
    } else {
        msg.say(config.personal.noSign);
    }
    // } else {
    //   msg.say(config.personal.joined);
    // }
}

/**
 * 发送群代码
 *
 * @param {*} msg
 * @param {*} tokenType
 */
async function sendCode(msg, tokenType) {
    // isGroup(msg, token[tokenType].room).then(isGroupStatus => {
    //   if (isGroupStatus) {
    //     msg.say(config.personal.joined)
    //   } else {
    let wechatId = msg.payload.fromId;
    console.log(wechatId);
    let {timestamp, sign} = createSign(wechatId);
    msg
        .say(config.personal.sign_pre)
        .then((_) =>
            msg
                .say(
                    `${config.signUrl}wechatid=${wechatId}&code=${token[tokenType].code}&timestamp=${timestamp}&sign=${sign}`
                )
                .then((_) =>
                    msg.say(
                        config.personal.sign_after_1 +
                        `${token[tokenType].code}` +
                        config.personal.sign_after_2
                    )
                )
        );
    // }
    // }).catch((e) => console.log("isGroup ERROR", e.message))
}

module.exports = {
    onMessage: onMessage,
    getOutRoom: getOutRoom,
};
