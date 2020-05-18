"use strict";
const crypto = require("crypto")
const { createUser, findUser } = require('../database/user/userHelper');
const { hash, compare } = require('../helpers/bcryptHelper');
const { sign } = require('../helpers/jwtHelpers');
const { set } = require('../helpers/redis');

// const register = async (req, res) => {
//   const hashed = await hash(req.body.password);

//   await createUser({ ...req.body, password: hashed });

//   return res.status(201).json({
//     status: 201,
//     message: 'User created successfully.',
//   });
// };
const registerUser = async (req, res) => {
          const { email, password } = req.body;
          const hashed = await hash(password);
  
          // userAlreadyExist
          const userAlreadyExist = await User.findOne({ email });
  
          if (userAlreadyExist) {
            return res.status(400).json({
              status: "failure",
              message: `User with given email ${email} already exists`
            });
          }
  
          const buf = crypto.randomBytes(20);
          const token = buf.toString("hex");
  
          const newUser = new User(
            Object.assign({}, req.body, {
              password_hash: hashed,
              created_at: Date.now(),
              verifyToken: token
            })
          );
  
          await newUser.save();
  
        res.status(200).json({
          email,
          status: "success",
          message: `User with the email ${email} created successfully!`
        });
}

const loginUser = async (req, res) => {
    console.log(" === loginUser ===",req.body)
    let {email, password} = req.body
    const user = await User.findOne({
        email //new RegExp(`^${phone_number}$`, "i") //thriveId is their telephone
      });

      if (!user)
        return res.status(404).json({
          status: "failure",
          error: `User with the given email ${email} could not be found`
        });

      // if(!hasher.CheckPassword(password, farmer.password_hash))
      // if(!CheckPassword(password, agent.password_hash)){
      if (!w.CheckPassword(password, user.password_hash)) {
        console.log(
          password,
          " password || Not equal || password_hash:.",
          user.password_hash
        );
        return res.status(401).json({
          status: "failure",
          message: "Login failed, wrong information supplied"
        });
      }
      console.log(
        password,
        " password || is equal || password_hash:.",
        user.password_hash
      );

      const token = agent.generateAuthToken();
      return res.status(200).json({
        email: user.email,
        status: "success",
        token,
        message: `Welcome back ${user.first_name}`
      });
}

/********************************
 *       FORGOT PASSWORD          *
 * ******************************/

const forgot_pword = async (req, res) => {
  //try {
    const { email } = req.body;
    user = await User.findOne({
      email: new RegExp(`^${email}$`, "i")
    });

    if (!user)
      return res.status(404).json({
        status: "failure",
        error: `User with the given email ${email} not found`
      });

    const buf = crypto.randomBytes(20);
    const token = buf.toString("hex");

    let time = Date.now() + 1000 * 60 * 60 * 2; //hrs
    agent.resetPasswordToken = token;
    agent.resetPasswordExpires = time;
    const savedUser = await user.save();

    if (!savedUser)
      return res.status(500).json({
        status: "failure",
        error: `Agent password cannot be changed at this time`
      });

    // const mailObject = {
    //   email,
    //   name: agent.first_name,
    //   templateName: "forgotpassword",
    //   link: `${process.env.HOST}/sign/resetpassword?token=${token}`
    // };
    // await mailUser(mailObject);

    return res.status(200).json({
      status: "success",
      message: `An e-mail has been sent to ${email} with further instructions.`
    });
//   } catch (error) {
//     return res.status(500).json({
//       status: "error",
//       message: `FORGET_PASSWORD_ERROR : ${error.message}`
//     });
//   }
};

/********************************
 *       RESET PASSWORD          *
 * ******************************/
const reset_pword = async (req, res, next) => {
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
};

export { registerUser, loginUser, forgot_pword, reset_pword };