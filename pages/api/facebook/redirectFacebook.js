import passport from "passport"
import "../../../utils/passport"
const setCookies = require("cookies-next").setCookie

export default async function redirectFacebook(req, res, next) {
    passport.authenticate("facebook", (err,user) => {
        if(err || !user){
            return res.redirect("http://localhost:3000/account/signup")
        }

        setCookies("token", user.token,
        {
            req,
            res,
            maxAge: 24 * 60 * 60
        })
        res.redirect("http://localhost:3000")
    })(req,res,next)
}