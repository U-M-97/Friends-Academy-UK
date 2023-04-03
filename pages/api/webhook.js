const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
const User = require("../../models/user")
const Course = require("../../models/courses")
const Coupon = require("../../models/coupons")
const Room = require("../../models/room")
import { buffer } from "micro"
const nodemailer = require("nodemailer")

export const config = {
    api: {
      bodyParser: false,
      externalResolver: true
    },
}

const fullFillCourseOrder = async (session) => {
    const user = session.metadata.userId
    const amount = session.amount_total / 100
    const course = session.metadata.courseId
    const coupon = session.metadata.coupon
    const email = session.customer_details.email
    console.log(email)

    const updateUser = await User.findByIdAndUpdate(user,
      {
        $inc: { amountPaid: amount },
        $push: {
          courses: course,
        },  
      }
    )
    
    const updateCourse = await Course.findByIdAndUpdate(course,
      {
        $push: {
          courseStudents: user
        }
    })

    if(coupon !== "unlimited" && coupon !== "No Coupon"){
      console.log("running")
      const UpdateCoupon = await Coupon.findByIdAndUpdate({_id: coupon}, {
        $inc: { totalUses: 1 }
      })
    }

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
          user: process.env.email,
          pass:process.env.pass
      }
    })

    let mailOptions = {
      from: {name: "Friends Academy", address: "team@friendsacademy.co.uk"},
      to: email,
      subject: "Join Whatsapp Group",
      text: `Your Course is booked successfully.`,
      html: `
          <p style="font-size: large; font-weight: bold; font-family: sans-serif">Please follow the link to join the whats app group. All correspondence will be through this group</p>
          <a href="https://chat.whatsapp.com/DmtFLreT6aQBEOoxVrSNnO" style="background-color: #25D366;
              padding: 5px 30px;
              width: 200px;
              cursor: pointer;
              border: none;
              font-weight: bold;
              font-size: large;
              text-decoration: none;
              color: black;
              font-family: sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              ">
              <img src="https://cdn-icons-png.flaticon.com/512/124/124034.png?w=740&t=st=1680534230~exp=1680534830~hmac=7c9dd8face614ad357c421cce5eb29ddcc1816dfb17358803b8319ffc871e7d5" alt="icon"
              style="height: 40px; width: 40px"
              >
              <p style="color: white; margin-left: 10px;">Join Group</p>
          </a>
      `
  }

  transporter.sendMail(mailOptions, (err,info) => {
    if(err){
        console.log(err)
    }else{
        console.log("Email Sent")
    }
})
}

const fullFillRoomOrder = async (session) => {
  console.log("running")
  const user = session.metadata.userId
  const room = session.metadata.roomId
  const booking = session.metadata.bookingId

  const updateBooking = await Room.findOneAndUpdate({_id: room, roomMembers:{ $elemMatch: { __id: booking}}}, {
    $set: { "roomMembers.$.paid": true }
  },{ new: true})

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
            if(session.metadata.paymentType === "Course Payment"){
              return fullFillCourseOrder(session).then(() => res.status(200).send({response: true})).catch((err) => res.status(400).send(`Webhook Error: ${err.message}`))
            }
            else if(session.metadata.paymentType === "Room Payment"){
              return fullFillRoomOrder(session).then(() => res.status(200).send({response: true})).catch((err) => res.status(400).send(`Webhook Error: ${err.message}`))
            }
          }
    }
}