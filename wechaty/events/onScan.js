const Qrterminal = require("qrcode-terminal")

/**
 * 扫码
 *
 * @param {*} qrcode
 * @param {*} status
 */
function onScan(qrcode, status) {
    Qrterminal.generate(qrcode, {small: true})
}

module.exports = {
    onScan: onScan,
}
