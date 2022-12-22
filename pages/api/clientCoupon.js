const dbConnect = require("../../utils/connectDB")
const Coupon = require("../../models/coupons")

export default async function handler(req, res){
    await dbConnect()
    
    if(req.method === "GET"){
        const extraction = ["_id" , "discount", "discountType","discountOn", "startDate", "usersLimit", "status"]
        const coupons = await Coupon.find({status: {$eq: "active"}}).select(extraction)  
        res.send(coupons)
    }
}