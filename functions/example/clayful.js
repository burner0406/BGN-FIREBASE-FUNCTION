"use strict";

// [START all]
// [START import]
// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require("firebase-functions");
const Clayful = require("clayful");
const Product = Clayful.Product;
Clayful.config({
    client: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjUzMDhjMmNhZDVjYTU3NDVhZDAxM2I1OTU5MjRmYmM1MjRhMzVlMzRmZWIzNTQ3MzkzN2RjOGJmZjliYjIxNjciLCJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNjQ2NzAwMTQ0LCJzdG9yZSI6IlVYQ0UyTFlNUTI5RS5MOEpTTVlMNzhLRUQiLCJzdWIiOiJTTFU5RUJUQ0NHVkQifQ.X80kn8mpWdg-mhmbQKpf7qKMlICRhJy10gpLlHESLdk",
    //customer:      "<customer-auth-token>",
    //debugLanguage: "ko"
});

// [START getProduct]
exports.getProduct = functions.region("asia-northeast3").https.onRequest(async (req, res) => {
    // [END addMessageTrigger]
    // Grab the text parameter.

    //const original = req.query.text;
    const name = req.body.name;

    const options = {
        query: {
            "page": 1,
            "search:name": name,
        },
    };
    Product.list(options, (err, response) => {
        //console.log(response);
        if (err) {
            res.json(err);
        }
        res.json(response.data);
    });
});
// [END getProduct]

// [END all]
