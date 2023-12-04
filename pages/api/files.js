const dbConnect = require("../../utils/connectDB");
const verifyToken = require("./verifyToken");
import File from "../../models/files";
import { bucketName, s3 } from "../../utils/aws";
import { getSignedUrl } from "@aws-sdk/cloudfront-signer";

export default async function handler(req, res) {
  await dbConnect();
  const role = "admin";
  const tokenCheck = await verifyToken(req, role);

  if (tokenCheck === "Allowed") {
    if (req.method === "GET") {
      const getFiles = await File.find().sort({ createdAt: -1 });
      let files = [];

      for (let i = 0; i < getFiles.length; i++) {
        const url = `${process.env.CDN}/${getFiles[i].key.replace(
          / /g,
          "%20",
        )}`;
        const privateKey = process.env.CLOUDFRONT_PRIVATE_KEY;
        const keyPairId = process.env.CLOUDFRONT_PUBLIC_KEY;
        const dateLessThan = new Date(Date.now() + 1000 * 60 * 24 * 24);

        const signedUrl = getSignedUrl({
          url,
          keyPairId,
          dateLessThan,
          privateKey,
        });
        console.log(signedUrl);

        const data = {
          file: getFiles[i],
          url: signedUrl,
        };

        files.push(data);
      }

      res.send(files);
    } else if (req.method === "DELETE") {
      const { file } = req.body;

      const params = {
        Bucket: bucketName,
        Key: file.key,
      };

      const deleteObject = await s3.deleteObject(params, async (err, data) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          const deleteFromDatabase = await File.findByIdAndDelete(file._id);
          if (deleteFromDatabase != null) {
            res.send("File Deleted Successfully");
          }
        }
      });
    } else if (req.method === "PUT") {
      const { file, input } = req.body;

      const editName = await File.findByIdAndUpdate(
        file._id,
        { name: input },
        { new: true },
      );
      if (editName != null) {
        res.send("Name Changed Successfully");
      } else {
        res.send("Error");
      }
    }
  } else if (tokenCheck === "Token is not Present") {
    return res.send("Token is not Present");
  } else if (tokenCheck === "Token is not Valid") {
    return res.send("Token is not Valid");
  }
}
