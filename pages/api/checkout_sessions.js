const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res){
    if(req.method === "POST"){
        const { user, selectedCourse } = req.body
        const userId = user._id
        const courseId = selectedCourse._id
        const transformedItems = [{
            description: selectedCourse.description,
            quantity: 1,
            price_data: {
                currency: "gbp",
                unit_amount: selectedCourse.price * 100,
                product_data: {
                    name: selectedCourse.title, 
                    images: [selectedCourse.image],
                }
            }
    }]

        try{
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: transformedItems,
                mode: "payment",
                success_url:`${req.headers.origin}/?success=true`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
                metadata: {userId, courseId},
            })
            res.status(200).json({ id: session.id })
        }catch(err){
            res.status(err.statusCode || 500).json(err.message);
        }
    }
}