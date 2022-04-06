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
exports.addTest = functions.region("asia-northeast3").https.onRequest(async (req, res) => {
    // [END addMessageTrigger]
    // Grab the text parameter.

    //const original = req.query.text;

    const collec = req.body.collec;
    const text = req.body.text;

    // [START adminSdkAdd]
    // Push the new message into Firestore using the Firebase Admin SDK.
    const writeResult = await admin.firestore().collection(collec).add({original: text});
    await admin.firestore().collection(collec).doc(writeResult.id).collection("INNER TEST").add({PPI: "PO"})

    // Send back a message that we"ve successfully written the message
    res.json({result: `Message with ID: ${writeResult.id} added....`});
    // [END adminSdkAdd]
});
// [END addTest]

// [START getTest]
exports.getTest = functions.region("asia-northeast3").https.onRequest(async (req, res) => {
    // [END addMessageTrigger]
    // Grab the text parameter.

    //const original = req.query.text;

    const collec = req.body.collec;
    const docId = req.body.docId;

    const col = admin.firestore().collection(collec).doc(docId);
    const doc = await col.get();

    if (!doc.exists) {
        functions.logger.log("No such document!");
    } else {
        functions.logger.log("Document data:", doc.data());
    }
    res.json(doc.data());
    // [END adminSdkAdd]
});
// [END getTest]

// [START makeUppercase]
// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
// [START makeUppercaseTrigger]
exports.makeUppercase = functions.region("asia-northeast3").firestore.document("/TEST/{documentId}")
    .onCreate((snap, context) => {
// [END makeUppercaseTrigger]
        // [START makeUppercaseBody]
        // Grab the current value of what was written to Firestore.
        const original = snap.data().original;

        // Access the parameter `{documentId}` with `context.params`
        functions.logger.log("Uppercasing", context.params.documentId, original);

        const uppercase = original.toUpperCase();

        // You must return a Promise when performing asynchronous tasks inside a Functions such as
        // writing to Firestore.
        // Setting an "uppercase" field in Firestore document returns a Promise.
        return snap.ref.set({uppercase}, {merge: true});
        // [END makeUppercaseBody]
    });
// [END makeUppercase]
// [END all]
