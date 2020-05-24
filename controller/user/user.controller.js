'use strict'
const User = require("./../../model/user.model")

//must be a user to perform all this action
const fetchAllUser = async (req, res) => {
    console.log(" === loginUser ===",req.body)
    let {email} = req.body
    const user = await User.find({});

      if (!user)
        return res.status(404).json({
          status: "failure",
          error: `User with the given email ${email} could not be found`
        });


      return res.status(200).json({
        status: "success",
        data: user
      });
}

const fetchUserByIdorEmail = async (req, res) => {
    console.log(" === loginUser ===",req.body)
    
    let {idOrEmail} = req.query
    console.log(" === idOrEmail ===",idOrEmail)
    // const user2 = await User.findOne({
    //     email: new RegExp(`^${idOrEmail}$`, "i") //thriveId is their telephone
    //   });
    // const user = await User.findOne({
    //     $or:[
    //         {email: new RegExp(`^${idOrEmail}$`, "i")},//"hakeem1691@icloud.com"}, 
    //         {_id: ObjectId(idOrEmail)}
    //     ]})
    let userByIdOrEmail= await User.findOne({ email: idOrEmail})
    if(!userByIdOrEmail){
        userByIdOrEmail = await User.findById(idOrEmail)
        if(!userByIdOrEmail){
            return res.status(404).json({
                status: "failure",
                error: `User with the given email or id ${idOrEmail} could not be found`
              });
        }
    }

    //   if (!user)
    //     return res.status(404).json({
    //       status: "failure",
    //       error: `User with the given email ${email} could not be found`
    //     });

      
      return res.status(200).json({
        status: "success",
        data: userByIdOrEmail,
      });
}

const updateUserByEmail = async (req, res) => {
    console.log(" === loginUser ===",req.body)
    console.log(" === params ===",req.params)
    console.log(" === query ===",req.query)
    let {email, options} = req.body
    const user = await User.findOneAndUpdate(
            {email: new RegExp(`^${idOrEmail}$`, "i")},
            {$set: {options}}
        )

      if (!user)
        return res.status(404).json({
          status: "failure",
          error: `User with the given email ${email} could not be found`
        });

      console.log("=== updated ==",user)
      return res.status(200).json({
        status: "success",
        message: "success data update",
        data: user,
      });
}


const deleteUserByEmail = async (req, res) => {
    console.log(" === loginUser ===",req.body)
    console.log(" === params ===",req.params)
    console.log(" === query ===",req.query)
    let {email, options} = req.body
    const user = await User.findOneAndDelete(
            {email: new RegExp(`^${idOrEmail}$`, "i")},
        )

      if (!user)
        return res.status(404).json({
          status: "failure",
          error: `User with the given email ${email} could not be found`
        });

      console.log("=== updated ==",user)
      return res.status(200).json({
        status: "success",
        message: "success data update",
        data: user,
      });
}
//TODO:  '' '' suspend
module.exports = { fetchAllUser, fetchUserByIdorEmail, updateUserByEmail, deleteUserByEmail };