"use strict";

// [START all]
// [START import]
// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
//const crypto = require("crypto");
const clayfulSecret = require("../util/clayful_secret");

const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
const Clayful = require("clayful");
const Product = Clayful.Product;
const Vendor = Clayful.Vendor;
//admin.initializeApp();

Clayful.config({
    client: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjUzMDhjMmNhZDVjYTU3NDVhZDAxM2I1OTU5MjRmYmM1MjRhMzVlMzRmZWIzNTQ3MzkzN2RjOGJmZjliYjIxNjciLCJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNjQ2NzAwMTQ0LCJzdG9yZSI6IlVYQ0UyTFlNUTI5RS5MOEpTTVlMNzhLRUQiLCJzdWIiOiJTTFU5RUJUQ0NHVkQifQ.X80kn8mpWdg-mhmbQKpf7qKMlICRhJy10gpLlHESLdk",
    //customer:      "<customer-auth-token>",
    //debugLanguage: "ko"
});
// [END import]
/*
exports.create = functions.region("asia-northeast3").https.onRequest(async (req, res) => {
    //webhook secret
    const webhookSecret = "0916771d157972ef4e8d643705f354842fc0815c72c276b950a2d04906917bbba8579f8018c39654e88c0ccb275baf7d";

    if ( clayfulSecret.secretCheck(webhookSecret, req) ) {
        functions.logger.log("secret ok");

        const collec = "product";
        const response = req.body.response;

        functions.logger.log("req :", req.body);

        //const writeResult = await admin.firestore().collection(collec).add(response);
        const result = await admin.firestore().collection(collec).doc(response._id).create(response);

        functions.logger.log("create result :", result);
        res.json({result: "ok"});
    } else {
        functions.logger.log("secret fail");
        res.json({result: "fail"});
    }
});
*/
exports.create = functions.region("asia-northeast3").https.onRequest(async (req, res) => {
    //webhook secret
    const webhookSecret = "52fb5cb3478719341e9659b5c92638410dee20522fb738b267e46475fac2eb8bd7d5e3237886d86fa0f8ddfabbbb0ec1";

    if ( clayfulSecret.secretCheck(webhookSecret, req) ) {
        functions.logger.log("secret ok");

        const response = req.body.response;
        functions.logger.log("req :", req.body);
        const db = admin.firestore();
        /*
        //const module = req.body.module; //clayful webhook module (ex: product.update)
        const vendor = await db.collection("vendor").doc(response.vendor).get();

        //vedor 존재 유무 확인 (없으면 삽입)
        if (vendor.exists && vendor.id == vendor.data()._id) {
            functions.logger.log("vendor exists : " + vendor.id);
        } else {
            //vendor가 firestore에 존재하지 않아 강제로 추가하는 구문
            functions.logger.log("No such vendor");
            const vendorData = await Vendor.get(response.vendor);
            await db.collection("vendor").doc(response.vendor).set(vendorData.data);
        }
        */

        // 상품정보 안에 입점사 정보 Firestore에 추가
        /*if ( response.vendor ) {
            const vendorData = await Vendor.get(response.vendor);
            functions.logger.log("Vendor Data : ", vendorData.data);
            productData.data.vendor = vendorData.data;
            //await admin.firestore().collection(coll).doc(response._id).update({"vendor": vendorData.data});
        } else {
            functions.logger.log("vendor 없음");
        }*/

        // 상품정보 Firestore 저장
        const productData = await Product.get(response._id);
        if ( response.vendor ) {
            const vendorData = await Vendor.get(response.vendor);
            //productData.data.vendor.lat = vendorData.data.meta.lat.raw;
            //productData.data.vendor.lon = vendorData.data.meta.lon.raw;
            productData.data.vendor = vendorData.data;
        }

        if ( response.meta.data_id ) {
            //productData.data.alcohol = alcoholData.data;
        }

        await db.collection("product").doc(response._id).set(productData.data);
    } else {
        functions.logger.log("secret fail");
    }
    res.json({})
});

exports.delete = functions.region("asia-northeast3").https.onRequest(async (req, res) => {
    //webhook secret
    const webhookSecret = "a6733f2067c4242924cdc558e7afd8fe6ad4f4ae53d25068a6edf35eec715de7bb67908f929bc99361316559beb87e26";

    if ( clayfulSecret.secretCheck(webhookSecret, req) ) {
        functions.logger.log("secret ok");
        const response = req.body.params;
        const coll = "vendor/"+response.vendor+"/vendor_product";

        functions.logger.log("req :", req.body);

        //const writeResult = await admin.firestore().collection(coll).add(response);
        await admin.firestore().collection(coll).doc(response.productId).delete();

        functions.logger.log("delete result :", response.productId);
        res.json({result: "ok"});
    } else {
        functions.logger.log("secret fail");
        res.json({result: "fail"});
    }
});

// [END all]
