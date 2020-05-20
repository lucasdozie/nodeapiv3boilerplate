"use strict";
const crypto = require("crypto"),
 // bcrypt = require("bcryptjs"),
  {
    LoginValidator,
    SignupValidator,
    VerifyToken,
    ForgotPassword,
    ResetPassword
  } = require("./../helpers/inputValidator"),
  {BASE_URI} = require("./../config/env");

const RESOURCE_NAME = "user";
let ENDPOINT = `${BASE_URI}${RESOURCE_NAME}`;
console.log(process.env.HOST,"== |===| ==",ENDPOINT)
//import * as controller from "../controllers/index";
const {registerUser, loginUser} = require("./../controller/user/auth.controller"),
     tryCatchWrapper = require("./../helpers/tryCatchWrapper")
module.exports = router => {
  router.get(`${ENDPOINT}/`, () => {
      console.log("==== Test Endpoint ====")
  });

  //router.get(`${ENDPOINT}/test`, controller.auth.testApi);

  /********************************
   *       AGENT CREATION         *
   * ******************************/

  router.post(`${ENDPOINT}/register`, SignupValidator, tryCatchWrapper(registerUser));

  /* *********** * **************** *
   *       AGENT   LOGIN            *
   * *********** * **************** */

  // router.post(`${ENDPOINT}/login`, LoginValidator, async (req, res) => {
  router.post(`${ENDPOINT}/login`, LoginValidator, tryCatchWrapper(loginUser));

  /********************************
   *       FORGOT PASSWORD          *
   * ******************************/

  router.post(`${ENDPOINT}/forgot_pword`, ForgotPassword, async (req, res) => {
    try {
      const { email } = req.body;
      user = await User.findOne({
        email: new RegExp(`^${email}$`, "i")
      });

      if (!user)
        return res.status(404).json({
          status: "failure",
          error: `Agent with the given email ${email} not found`
        });

      const buf = crypto.randomBytes(20);
      const token = buf.toString("hex");

      let time = Date.now() + 1000 * 60 * 60 * 2; //hrs
      user.resetPasswordToken = token;
      user.resetPasswordExpires = time;
      const savedUser = await user.save();

      if (!savedUser)
        return res.status(500).json({
          status: "failure",
          error: `Agent password cannot be changed at this time`
        });

      const mailObject = {
        email,
        name: agent.first_name,
        templateName: "forgotpassword",
        link: `${process.env.HOST}/sign/resetpassword?token=${token}`
      };
      await mailUser(mailObject);

      return res.status(200).json({
        status: "success",
        message: `An e-mail has been sent to ${email} with further instructions.`
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: `FORGET_PASSWORD_ERROR : ${error.message}`
      });
    }
  });

  /********************************
   *       RESET PASSWORD          *
   * ******************************/
  router.post(
    `${ENDPOINT}/reset_pword`,
    ResetPassword,
    async (req, res, next) => {
      try {
        const { newPassword, token } = req.body;

        const agent = await Agent.findOne({
          resetPasswordToken: token,
          resetPasswordExpires: {
            $gt: Date.now()
          }
        });
        // User.find({ resetPasswordToken: token}).where('resetPasswordExpires').gt(Date.now());

        if (!agent)
          return res.status(404).json({
            status: "failure",
            error: `Password reset token ${token} is invalid or has expired.`
          });

        agent.resetPasswordToken = null;
        agent.resetPasswordExpires = null;
        agent.password = newPassword;
        await agent.save();
        const mailObject = {
          email: agent.email,
          name: agent.first_name,
          templateName: "passwordresetsuccessful",
          link: `${process.env.HOST}/sign/signin`
        };
        await mailUser(mailObject);

        return res.status(200).json({ message: "Password reset successful" });
      } catch (error) {
        return res.status(500).json({
          status: "error",
          message: `RESET_PASSWORD_ERROR : ${error.message}`
        });
      }
    }
  );
};
