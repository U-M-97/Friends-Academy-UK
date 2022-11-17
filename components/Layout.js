import Header from "./header"
import Navbar from "./navbar"
import Footer from "./footer"
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'

export default function Layout({children}){

  const [ mobile, setMobile ] = useState(false)
  const router = useRouter()
  const homePage = router.pathname == "/account/signup" || router.pathname == "/account/login" || router.pathname.startsWith("/admin") ? false : true
  
  useEffect(() => {
    console.log(mobile)
  }, [mobile])

  return (
    <div className={mobile == true ? "overflow-y-hidden" : ""}>
        {
          homePage && 
          <>
            <Header/>
            <Navbar on={() => setMobile(true)} off={() => setMobile(false)}/>
          </> 
        }
        <main>
          {children}
        </main>
        {
          homePage && <Footer/>
        }    
    </div>
  )
}
