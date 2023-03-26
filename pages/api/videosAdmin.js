const dbConnect = require("../../utils/connectDB")
const verifyToken = require("./verifyToken")
const Video = require("../../models/videos")

export default async function handler (req, res) {
    await dbConnect()
    const role = "admin"
    const tokenCheck = await verifyToken(req, role)

    if(tokenCheck === "Token is not Present"){
        return res.send("Token is not Present")
    }

    if(tokenCheck === "Token is not Valid"){
        return res.send("Token is not Valid")
    }

    if(tokenCheck === "Allowed"){
        if(req.method === "GET"){
            const getRequests = await Video.findOne().populate("requests")
            console.log(getRequests)
            res.send(getRequests)
        }

        else if(req.method === "POST"){
            const { id } = req.body
            console.log(id)
            try{
                const approve = await Video.findOneAndUpdate({
                    $push: {
                        access: {
                            user: id
                        }
                    },
                    $pull: {
                        requests: id
                    }
                })
                console.log(approve)
                res.send("Approved Successfully")
            }catch(err){
                res.send(err)
            }
        }
    }
}