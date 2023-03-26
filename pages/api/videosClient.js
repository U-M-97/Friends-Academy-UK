const dbConnect = require("../../utils/connectDB")
const verifyToken = require("./verifyToken")
import File from "../../models/files"
import { getSignedUrl } from "@aws-sdk/cloudfront-signer";
const Video = require("../../models/videos")

export default async function handler (req, res) {
    await dbConnect()
    const role = "client"
    const tokenCheck = await verifyToken(req, role)

    if(tokenCheck === "Token is not Present"){
        return res.send("Token is not Present")
    }

    if(tokenCheck === "Token is not Valid"){
        return res.send("Token is not Valid")
    }

    if(tokenCheck === "Allowed"){
        if(req.method === "GET"){
            const checkAccess = await Video.findOne({ $in: { access: { user: req.query.id}}})
            console.log(checkAccess)
            if(!checkAccess){
                return res.send("Access Denied")
            }
            
            const getFiles = await File.find().sort({createdAt: -1})
            let files = []

            for(let i=0; i<getFiles.length; i++){ 
                const url = `${process.env.CDN}/${getFiles[i].key.replace(/ /g, '%20')}`;
                const privateKey = process.env.CLOUDFRONT_PRIVATE_KEY;
                const keyPairId = process.env.CLOUDFRONT_PUBLIC_KEY;
                const dateLessThan = new Date(Date.now() + 1000 * 60 * 24 * 24)
    
                const signedUrl = getSignedUrl({
                    url,
                    keyPairId,
                    dateLessThan,
                    privateKey,
                })

                const data = {
                    file: getFiles[i],
                    url: signedUrl
                }
                
                files.push(data)
            }

            res.send(files)
        }

        else if(req.method === "POST"){
            const { id } = req.body
            try{
                const checkReq = await Video.findOne({requests: {$in: id}})
                if(checkReq){
                    return res.send("Already Requested")
                }
                const videoReq = await Video.findOneAndUpdate({ 
                    $push: {
                        requests: id
                    }
                })
                console.log(videoReq)
                return res.send("Request Sent Successfully")
            }catch(err){
                return res.send(err)
            }
        }
    }
}