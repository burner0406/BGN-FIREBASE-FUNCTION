"use strict";

// [START all]
// [START import]
// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();
// [END import]

// [START addTest]
exports.hookProductCreate = functions.region("asia-northeast3").https.onRequest(async (req, res) => {
    //const original = req.query.text;

    const collec = "product";
    const response = req.body.response;

    functions.logger.log("req :", req.body);

    const writeResult = await admin.firestore().collection(collec).add(response);

    res.json({result: `Message with ID: ${writeResult.id} added....`});
});
// [END addTest]

// [END all]
