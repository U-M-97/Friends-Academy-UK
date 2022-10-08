const User = require("../../models/user")
const jwt = require("jsonwebtoken")
const dbConnect = require("../../utils/connectDB")

export default async function handler (req, res) {
    await dbConnect()
    const {cookieExist} = req.body
    console.log(cookieExist)
    jwt.verify(cookieExist, process.env.jwtSecret, async (err, user) => {
        if(err){
            console.log(err)
            return res.send("Token is not Valid")
        }
        const userData = await User.findById(user.id)
        if(!userData){
            return res.send("User not exists")
        }
        res.send(userData)
    })
}