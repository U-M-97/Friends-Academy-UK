const dbConnect = require("../../utils/connectDB")
const verifyToken = require("./verifyToken")
import File from "../../models/files"
import { getSignedUrl } from "@aws-sdk/cloudfront-signer";
const Video = require("../../models/videos")
const cron = require("cron")
const dayjs = require("dayjs")

export default async function handler (req, res) {
    await dbConnect()
    const role = "client"
    const tokenCheck = await verifyToken(req, role)

    const date = dayjs()

    const job = new cron.CronJob("0 * * * * ", async () => {
        console.log("Running Cron")
        const videos = await Video.findOne().populate("access")
        if(videos.access.length !== 0){
            videos.access.forEach(async (item) => {
                const diff = date.diff(dayjs(item.time), "hour")
                if(diff > 24) {
                    const update = await Video.findOneAndUpdate({
                        $pull: {
                            access: {
                                user: item.user
                            }
                        }
                    })
                }
            })
        }
    })

    job.start()

    if(tokenCheck === "Token is not Present"){
        return res.send("Token is not Present")
    }

    if(tokenCheck === "Token is not Valid"){
        return res.send("Token is not Valid")
    }

    if(tokenCheck === "Allowed"){
        if(req.method === "GET"){
            const checkAccess = await Video.findOne({ "access.user": req.query.id})
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
                return res.send("Request Sent Successfully")
            }catch(err){
                return res.send(err)
            }
        }
    }
}