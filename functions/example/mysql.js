"use strict";

// [START all]
// [START import]
// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require("firebase-functions");
const mysql = require("mysql");
const conn = {
    host: "175.126.77.159",
    port: "3306",
    user: "looxent",
    password: "looxent",
    database: "db_looxent",
};

// [START getProduct]
exports.getMysql = functions.region("asia-northeast3").https.onRequest(async (req, res) => {
    const connection = mysql.createConnection(conn);
    connection.connect();

    const testQuery = "SELECT * FROM tb_comment LIMIT 20";

    connection.query(testQuery, function(err, results, fields) { // testQuery 실행
        if (err) {
            //console.log(err);
            res.json(err);
        }
        //console.log(results);
        res.json(results);
    });
    connection.end(); // DB 접속 종료
});
// [END getProduct]

// [END all]
