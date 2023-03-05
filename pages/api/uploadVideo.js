const dbConnect = require("../../utils/connectDB")
const verifyToken = require("./verifyToken")
import {bucketName, s3} from "../../utils/aws"
import File from "../../models/files"

export default async function handler (req, res) {

    await dbConnect()
    const role = "admin"
    const tokenCheck = await verifyToken(req, role)

    if(tokenCheck === "Allowed"){
        if(req.body.reqMethod === "UploadId"){

            const { fileName, contentType } = req.body

            const params = {
                Bucket: bucketName,
                Key: fileName,
                ContentType: contentType
            }
    
            const uploadId = await s3.createMultipartUpload(params).promise()
    
            res.send(uploadId)
        }
        else if(req.body.reqMethod === "getUrl"){

            const { fileName, partNumber, uploadId } = req.body

            const params = ({
                Bucket: bucketName,
                Key: fileName,
                // Expires: 120,
                PartNumber: partNumber,
                UploadId: uploadId 
            })

            const signedURL = await s3.getSignedUrl('uploadPart', params)
            res.send(signedURL)
        }
        else if(req.body.reqMethod === "complete"){
            
            const { fileName, parts, uploadId } = req.body

            const params = ({
                Bucket: bucketName,
                Key: fileName,
                MultipartUpload: {
                    Parts: parts
                },
                UploadId: uploadId 
            })

            const completed = await s3.completeMultipartUpload(params).promise()

            const lastIndex = fileName.lastIndexOf(".")
            const fileType = fileName.slice(lastIndex + 1)
            const tutorialName = fileName.slice(0, lastIndex)

            const file = new File({
                name: tutorialName,
                key: fileName,
                location: `${process.env.CDN}/${fileName}`,
                type: fileType
            })
            await file.save()

            res.send(completed)
        }
        else if(req.body.reqMethod === "abort"){

            const { fileName, uploadId } = req.body

            const params = {
                Bucket: bucketName,
                Key: fileName,
                UploadId: uploadId
            }

            const abort = await s3.abortMultipartUpload(params).promise()
            res.send(abort)
        }

        else if(req.method === "GET"){

            //Delete inactive uploadIds
            const ids = s3.listMultipartUploads({ Bucket: bucketName }, (err, data) => {
                if (err) {
                  console.error(err);
                  res.send(err)
                } else {
                  const uploads = data.Uploads;
                  if (uploads.length === 0) {
                    console.log('No in-progress multipart uploads');
                    res.send("No Active UploadId")
                  } else {
                    console.log('In-progress multipart uploads:');
                    uploads.forEach(upload => {
                      console.log(`- Upload ID: ${upload.UploadId}, Key: ${upload.Key}`);
                      const params = {
                        Bucket: bucketName,
                        Key: upload.Key,
                        UploadId: upload.UploadId
                      }
                      s3.abortMultipartUpload(params).promise()
                    });
                    res.send("Deleted UploadIds Successfully")
                  }
                }
            });

            //Check How many parts are uploaded already
            // const params = {
            //     Bucket: bucketName,
            //     Key: "Rhaenyra and Daemon - Young and Beautiful.mkv",
            //     UploadId: 'gHvYT4jIKkbO35rbKUL0Jir3IbYVeUndVaEpoFLVsmwk7RIrFj8Bs1QRSDfXTa1Tr8e32DR2vrvQfJ.ye5x7QJr8twN5KdSPGxZF_anMD.Q-'
            // }

            // s3.listParts(params, function(err, data) {
            //     if (err) {
            //       console.log(err, err.stack);
            //     } else {
            //       // Log the uploaded parts
            //       console.log(data.Parts);
            //     }
            //   });

            //   res.send("as")
        }
    }

    else if(tokenCheck === "Token is not Present"){
        return res.send("Token is not Present")
    }

    else if(tokenCheck === "Token is not Valid"){
        return res.send("Token is not Valid")
    }

}