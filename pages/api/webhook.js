const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
const User = require("../../models/user")
import { buffer } from "micro"

export const config = {
    api: {
      bodyParser: false,
      externalResolver: true
    },
}

const fullFillOrder = async (session) => {
    const user = session.metadata.userId
    const amount = session.amount_total / 100
    const findUser = await User.findByIdAndUpdate(user,
      {
        $inc: { amountPaid: amount },
        $push: {
          courses: session.metadata.courseId,
        },  
      }
    )
    console.log(findUser)
}

export default async function WebHookHandler (req, res) {
    if(req.method === "POST"){
        const buf = await buffer(req)
        const sig = req.headers['stripe-signature']

        let event

        try {
            event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret)
          } catch (err) {
            console.log(`Error message: ${err.message}`)
            res.status(400).send(`Webhook Error: ${err.message}`)
            return
          }

          if(event.type === "checkout.session.completed"){
            const session = event.data.object
            return fullFillOrder(session).then(() => res.status(200)).catch((err) => res.status(400).send(`Webhook Error: ${err.message}`))
          }
    }
}