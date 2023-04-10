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
            const getRequests = await Video.findOne().populate("requests").populate("access.user")
            res.send(getRequests)
        }

        else if(req.method === "POST"){
            const { id } = req.body
  
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

        else if(req.method === "DELETE"){
            if(req.query.type === "remove request"){
                console.log( req.query.id)
                try{
                    const remove = await Video.findOneAndUpdate({
                        $pull: {
                            requests: req.query.id
                        }
                    })
                    res.send("Request removed successfully")
                }catch(err){
                    res.send(err)
                }
            }

            else if(req.query.type === "remove access"){
                try{
                    const remove = await Video.findOneAndUpdate({
                        $pull: {
                            access: {
                                user: req.query.id
                            }
                        }
                    })
                    res.send("Access removed successfully")
                }catch(err){
                    res.send(err)
                }
            }
           
        }
    }
}