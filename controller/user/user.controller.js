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

const fetchActiveUser = async (req, res) => {
    console.log("== req.user ==",req.user)
     const user = await User.findById(req.user.id)
        if(!user){
            return res.status(404).json({
                status: "failure",
                error: `User with the given id ${req.user.id} could not be found`
              });
        }
      
      return res.status(200).json({
        status: "success",
        data: user,
      });
}

const fetchUserByIdorEmail = async (req, res) => {
    let {idOrEmail} = req.query
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

      
      return res.status(200).json({
        status: "success",
        data: userByIdOrEmail,
      });
}

const updateUserByEmail = async (req, res) => {
    let {email} = req.query
   // console.log(email," ==email | options== ",options)
    const query = { "email": email};
    // Set some fields in that document oballum.joy@yahoo.com
    const update = {
        "$set": req.body
    }
    // Return the updated document instead of the original document
    const options = { returnNewDocument: true };
    const user = await User.findOneAndUpdate(query, update, options)

      if (!user)
        return res.status(404).json({
          status: "failure",
          error: `User with the given email ${email} could not be found`
        });

      //console.log("=== updated ==",user)
      return res.status(200).json({
        status: "success",
        message: "successfully updated",
        data: user,
      });
}


const deleteUserByEmail = async (req, res) => {
    let {email} = req.query
    const user = await User.findOneAndDelete(
            {email: new RegExp(`^${email}$`, "i")},
        )

      if (!user)
        return res.status(404).json({
          status: "failure",
          error: `User with the given email ${email} could not be found`
        });
    

      console.log("=== updated ==",user)
      return res.status(200).json({
        status: "success",
        message: "successfully deleted",
        data: user,
      });
}
//TODO:  '' '' suspend
module.exports = { fetchAllUser, fetchActiveUser, fetchUserByIdorEmail, updateUserByEmail, deleteUserByEmail };