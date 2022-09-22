import Header from "./header"
import Navbar from "./navbar"
import Footer from "./footer"
import { useEffect, useState } from "react"

export default function Layout({children}){

  const [ mobile, setMobile ] = useState(false)
  
  useEffect(() => {
    console.log(mobile)
  }, [mobile])

  return (
    <div className={mobile == true ? "overflow-y-hidden" : " scrollbar scrollbar-track-white scrollbar-thumb-green scrollbar-thumb-rounded-full h-screen"}>
      <div className="mr-4">
        <Header/>
        <Navbar on={() => setMobile(true)} off={() => setMobile(false)}/>
        <main>
          {children}
        </main>
        <Footer/>
      </div>
     
    </div>
  )
}
