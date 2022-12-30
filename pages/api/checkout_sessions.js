const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res){
    
    if(req.method === "POST"){
        const { user, selectedCourse, coupon } = req.body
        console.log(selectedCourse)
        const userId = user._id
        const courseId = selectedCourse._id
        const transformedItems = [{   
            quantity: 1,
            price_data: {
                currency: "gbp",
                unit_amount: selectedCourse.price * 100,
                product_data: {
                    name: selectedCourse.title, 
                    images: [selectedCourse.image],
                    description: selectedCourse.description,
                }
            }
    }]

        try{
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: transformedItems,
                mode: "payment",
                invoice_creation: {enabled: true},
                success_url:`${req.headers.origin}/paymentSuccessfull`,
                cancel_url: `${req.headers.origin}/paymentUnsuccessfull`,
                metadata: {userId, courseId, coupon},
            })
            res.status(200).json({ id: session.id })
        }catch(err){
            res.status(err.statusCode || 500).json(err.message);
        }
    }
}