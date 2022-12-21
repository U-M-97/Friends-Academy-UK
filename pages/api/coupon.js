const dbConnect = require("../../utils/connectDB")
const verifyToken = require("./verifyToken")
const Coupon = require("../../models/coupons")

export default async function handler(req, res){
    
    await dbConnect()
    
    const tokenCheck  = verifyToken(req)

    if(tokenCheck === "Token is not Present"){
        return res.send("Token is not Present")
    }

    if(tokenCheck === "Token is not Valid"){
        return res.send("Token is not Valid")
    }

    if(tokenCheck === "Allowed"){
        if(req.method === "POST"){
            const { couponCode, couponName, discount, discountType, discountOn, startDate, endDate, totalUsers} = req.body
            const newCoupon = await new Coupon({
                name: couponName,
                code: couponCode,
                discount: parseInt(discount),
                discountType: discountType,
                discountOn: discountOn,
                startDate: startDate,
                endDate: endDate,
                usersLimit: totalUsers,
                status: "active"
            }).save()
            
            res.send("Coupon Created Successfully")
        }

        else if(req.method === "GET"){
            const coupons = await Coupon.find()
            res.send(coupons)
        }

        else if(req.method === "DELETE"){
            const id = req.body

            try{
                const delCoupon = await Coupon.findByIdAndDelete(id)
                if(delCoupon){
                    res.send("Coupon Deleted Successfully")
                }
            }catch(err){
                res.send(err)
            }  
        }
    }
}