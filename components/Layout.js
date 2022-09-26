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
    <div className={mobile == true ? "overflow-y-hidden" : "sm:scrollbar sm:scrollbar-track-white sm:scrollbar-thumb-green sm:scrollbar-thumb-rounded-full h-screen"}>
      <div className="sm:mr-4">
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
