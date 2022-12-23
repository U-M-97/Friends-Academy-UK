const dbConnect = require("../../utils/connectDB")
const Coupon = require("../../models/coupons")
const verifyToken = require("./verifyToken")

export default async function handler(req, res){
    await dbConnect()
    
    if(req.method === "GET"){
        const extraction = ["_id" , "discount", "discountType","discountOn", "startDate", "endDate", "usersLimit", "status"]
        const coupons = await Coupon.find({status: {$eq: "active"}}).select(extraction)  
        res.send(coupons)
    }
    else{
        const tokenCheck = await verifyToken(req)
        
        if(tokenCheck === "Token is not Present"){
            return res.send("Token is not Present")
        }
    
        if(tokenCheck === "Token is not Valid"){
            return res.send("Token is not Valid")
        }

        if(tokenCheck === "Allowed"){
            const { code, course } = req.body
            if(req.method === "POST"){
                const checkCoupon = await Coupon.findOne({$and: [{status: "active"}, {code: code}, {discountOn: course}]}).select("discount")
                if(checkCoupon){
                    res.send({message: "Coupon is Valid", discount: checkCoupon.discount})
                }else{
                    res.send({message: "Invalid Coupon"})
                }
            }
        }
    }
}