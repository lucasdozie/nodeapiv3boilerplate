"use strict";

const RESOURCE = "/api/v1/"
const routeBase = `${RESOURCE}`
module.exports = (route) => {
    route.get(`${routeBase}test`, (req, res, next) => {
        res.status(200).json({
            statusCode: 200,
            message: "Welcome to the good life"
        })
    }),
    route.get(`${routeBase}user/all`, (req, res, next) => {
        res.status(200).json({
            statusCode: 200,
            message: "Request was successful",
            data: [{name: "lucas", role: "Engineering", age: 20},{name: "Joy", role: "Finance", age: 25},{name: "Sola", role: "Growth", age: 30}]
        })
    })
}