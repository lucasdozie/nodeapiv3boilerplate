module.exports = (req, res, next) => {
    if(req.user.role === "admin"){
        next()
    }else{
        res.status(401).json({
            message: "Unauthorized user!, you need admin account to access this endpoint"
        })
    }
}