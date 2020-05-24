"use strict";
const {BASE_URI} = require("./../config/env"),
  tryCatchWrapper = require("./../helpers/tryCatchWrapper"),
  {fetchAllUser, fetchUserByIdorEmail, updateUserByEmail, deleteUserByEmail} = require("./../controller/user/user.controller");
const isAdminMiddleware = require("./../helpers/isAdmin")
const isLoginMiddleware = require("./../helpers/isLogin")
const ENDPOINT = `${BASE_URI}`;
console.log("== |=| ==",ENDPOINT)
module.exports = (route) => {
    route.get(`${ENDPOINT}test`, (req, res, next) => {
        res.status(200).json({
            statusCode: 200,
            message: "Welcome to the good life"
        })
    }),
    route.get(`${ENDPOINT}user/all`, isLoginMiddleware, tryCatchWrapper(fetchAllUser)),
    route.get(`${ENDPOINT}user/findUser`, isLoginMiddleware, tryCatchWrapper(fetchUserByIdorEmail)),
    route.put(`${ENDPOINT}user/update`, isAdminMiddleware, tryCatchWrapper(updateUserByEmail)),
    route.delete(`${ENDPOINT}user/delete`, isAdminMiddleware, tryCatchWrapper(deleteUserByEmail))
}