"use strict";
const {BASE_URI} = require("./../config/env");
// const RESOURCE = "/api/v1/"
// const routeBase = `${RESOURCE}`

//let ENDPOINT;
const ENDPOINT = `${BASE_URI}`;
console.log("== |=| ==",ENDPOINT)
module.exports = (route) => {
    route.get(`${ENDPOINT}test`, (req, res, next) => {
        res.status(200).json({
            statusCode: 200,
            message: "Welcome to the good life"
        })
    }),
    route.get(`${ENDPOINT}user/all`, (req, res, next) => {
        res.status(200).json({
            statusCode: 200,
            message: "Request was successful",
            data: [{name: "lucas", role: "Engineering", age: 20},{name: "Joy", role: "Finance", age: 25},{name: "Sola", role: "Growth", age: 30}]
        })
    })
}