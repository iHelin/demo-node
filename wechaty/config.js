module.exports = {
    // token: "puppet_donut_2cdaef0013a6b5e0", // puppet_padplus Token
    token: "puppet_donut_38b153a9326ef38b", // puppet_padplus Token Test
    signUrl: "https://littleloong.dragonguild.org/?",////Sign URL
    // signUrl: "http://127.0.0.1:8686/?",////Sign URL Test
    time: '0 */10 * * * ?', // 每10min执行， https://github.com/node-schedule/node-schedule
    self: 'wxid_wngd89exc7vm12', //小龙人ID
    // self: 'wxid_tvqy4f4m1uyn22',  // 法拉利少女ID
    name: "小龙人",// 你的机器人名字
    blacklist: ["wxid_tvqy4f4m1uyn22", "weixin", "wxid_wngd89exc7vm12"],
    // 群聊
    room: {
        roomJoinReply: "嘿！欢迎加入!",//  加入房间回复
        admin: "littleloong.dragonguild.org"
    },
    // 私聊
    personal: {
        // 是否开启加群
        addRoom: true,
        welcome: "你好！请问你要进入的群代号是什么？",
        others: "无法识别该指令，请重新输入你要进入的群代号。若需要帮助请发送指令 help ",
        joined: "你已经在群里面了呀",
        sign_pre: "请把以下链接通过浏览器打开，并使用钱包完成签名:",
        sign_after_1: "签名完成后，请发送确认码(",
        sign_after_2: ")，系统会自动检测你的持仓量是否达到进群门槛。",
        noSign: "你的签名未成功，请再次尝试",
        noSignInGroup: "请添加小龙人微信进行签名验资后申请进群！",
        canPass: "你的持仓量达到要求，已邀请你进群。请注意，进群后若持仓量发生变化导致不足，小龙人会自动将你移出群聊。",
        cantPass: "最低持仓量未达到要求，无法进群。",
        cantPassInGroup: "持仓不足，拜拜！",
        rule: "敬请期待！",
        help: "请查看 https://shimo.im/docs/rp3OVgvmdLcVBQAm/ 《‍🐉小龙人用户手册》",
    },
}
