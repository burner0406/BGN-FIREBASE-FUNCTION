"use strict";

// [START all]
// [START import]
// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const crypto = require("crypto");
// [END import]

exports.secretCheck = function(webhookSecret, req) {
    //웹훅 ID(webhook), 이벤트 실행 모듈(module), 전송 시점(requestedAt)
    const secretStr = req.body.webhook + ":" + req.body.module + ":" + req.body.requestedAt;
    //웹훅의 시크릿과 HMAC-SHA256 해싱 방식을 이용해, 헥스(Hex) 코드화된 해시(Hash)를 생성
    const hash = crypto.createHmac("sha256", webhookSecret).update(secretStr).digest("hex");
    //Clayful Signature
    const clayfulSign = req.header("Clayful-Signature");

    return hash == clayfulSign;
};

