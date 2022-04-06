"use strict";

// [START all]
// [START import]
// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
//const crypto = require("crypto");
const clayfulSecret = require("../util/clayful_secret");
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

const Clayful = require("clayful");
//const Product = Clayful.Product;
const Vendor = Clayful.Vendor;

Clayful.config({
    client: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjUzMDhjMmNhZDVjYTU3NDVhZDAxM2I1OTU5MjRmYmM1MjRhMzVlMzRmZWIzNTQ3MzkzN2RjOGJmZjliYjIxNjciLCJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNjQ2NzAwMTQ0LCJzdG9yZSI6IlVYQ0UyTFlNUTI5RS5MOEpTTVlMNzhLRUQiLCJzdWIiOiJTTFU5RUJUQ0NHVkQifQ.X80kn8mpWdg-mhmbQKpf7qKMlICRhJy10gpLlHESLdk",
    //customer:      "<customer-auth-token>",
    //debugLanguage: "ko"
});
// [END import]

exports.create = functions.region("asia-northeast3").https.onRequest(async (req, res) => {
    //webhook secret
    const webhookSecret = "fb7a6bb47826b00f2e90c747ac791d1c914eed4ed07249a15ff054f0b750f2a747d12dc37fdd9d326684e89d89c6dfaf";

    if ( clayfulSecret.secretCheck(webhookSecret, req) ) {
        functions.logger.log("secret ok");
        const db = admin.firestore()

        const response = req.body.response;
        functions.logger.log("req :", req.body);

        //const module = req.body.module; //clayful webhook module (ex: product.update)
        
        // 입점사 Firestore 가져오기
        const vendorData = await Vendor.get(response._id);
        //await db.collection("vendor").doc(response._id).set(vendorData.data);
        
        // Product 안에 Vendor 데이터 일괄 변경
        const productRef = db.collection("product");
        const productSnapshot = await productRef.where("vendor._id", "==", response._id).get();
        productSnapshot.forEach((doc) =>{
            functions.logger.log(doc.data());
            productRef.doc(doc.id).update({vendor: vendorData.data});
        });
    } else {
        functions.logger.log("secret fail");
    }
    res.json({})
});

// [END all]
