const Cryptr = require('cryptr');
const cryptr = new Cryptr('ishop_token_$#@!');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secretKey = "wscubetech@123@@@"
// const { v1 } = require('uuid')

// const userTokens = new Map();



function verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature) {
    const secret = 'RDU8kyTwp391mehT3oXerX6X'
    const generated_signature = crypto.createHmac('sha256', secret)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest('hex');

    return generated_signature === razorpay_signature;
}

const razorpayInstance = new Razorpay({
    // key_id: 'rzp_test_bDLKmM81FAxF1y',
    key_id: 'rzp_test_Ir0Q50gcWll5wv',
    key_secret: 'Orppym5yYOOvmSm1AP56UQTh',
    // key_secret: 'RDU8kyTwp391mehT3oXerX6X',
});

function getRendomNumber(file_name) {
    return new Date().getTime() + Math.floor(Math.random() * 1000) + file_name;
}

function encryptPassword(password) {
    return cryptr.encrypt(password);
}

function decryptPassword(password) {
    return cryptr.decrypt(password);
}

const CreateToken = (data) => {
    const token = jwt.sign({ data }, secretKey, { expiresIn: 20 })
    return token;
    // const token = v1()
    // if (userTokens.get(token) == undefined) {
    //     userTokens.set(token, data)
    //     return token;
    // } else {
    //     CreateToken(data)
    // }

}


const verifyToken = (token) => {
    try {
        const code = jwt.verify(token, secretKey)
        return code;
    } catch (err) {
        console.log(err)
    }
    // if (userTokens.get(token) == undefined) return false;
    // else return true;
}


module.exports = { getRendomNumber, encryptPassword, decryptPassword, razorpayInstance, verifyPayment, CreateToken, verifyToken };