const nodemailer = require("nodemailer")

export default async function handler(req,res){
    if(req.method === "POST"){
        const {name,email,subject,message} = req.body
        
        const output = `
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Subject: ${subject}</p>
            <p>Message: ${message}</p>
        `
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.email,
                pass:process.env.pass
            }
        })
        console.log(transporter)
        let mailOptions = {
            from: {name: name, address: `${email}`},
            to: "hafizusamamaqsood@gmail.com",
            subject: subject,
            html: output
        }
        console.log(mailOptions)

        transporter.sendMail(mailOptions, (err,info) => {
            if(err){
                console.log(err)
                res.send("Failed")
            }else{
                console.log("Email Sent")
                res.send("Email Sent")
            }
        })
    }
}