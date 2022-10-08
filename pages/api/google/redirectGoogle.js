import passport from "passport"
import "../../../utils/passport"
const setCookies = require("cookies-next").setCookie

export default async function redirectGoogle(req, res, next){
    passport.authenticate("google", (err, user) => {
        if(err || !user){
            return res.redirect("http://localhost:3000/account/signup")
        }
        setCookies("token", user.token, {
            req,
            res
        })
        res.redirect("http://localhost:3000")
    })(req, res, next)
}
