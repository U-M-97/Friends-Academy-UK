import User from "../../../models/user"
const jwt = require("jsonwebtoken")
const dbConnect = require("../../../utils/connectDB")
const setCookies = require("cookies-next").setCookie

const authEmail = async (req, res) => {
    await dbConnect()
    const { inputs, plab2 } = req.body
    const username = inputs.firstName.concat(" " + inputs.lastName)
    console.log(username)
    try{
        const userExist = await User.findOne({email: inputs.email})
        if(userExist){
            return res.send("Email already exists")
        }

        const newUser = new User({
            email: inputs.email,
            username: username,
            password: inputs.password,
            plab2Date: plab2
        })
        const user = await newUser.save()
        
        const token = jwt.sign(
            {
              id: newUser._id,
              created: Date.now().toString(),
            },
            process.env.jwtSecret,
            {expiresIn: "3d"}
        )
        newUser.token = token
        await newUser.save()

        setCookies("token", token, {
            req,
            res,
            maxAge: 24 * 60 * 60
        })

        const {password, ...others} = newUser._doc
        console.log(others)
        res.send(others)
    }catch(err){
        res.send(err)
    }
}

module.exports = authEmail