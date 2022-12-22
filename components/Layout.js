import Header from "./header"
import Navbar from "./navbar"
import Footer from "./footer"
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import CircularProgress from '@mui/material/CircularProgress'
import DiscountHeader from '../components/discountHeader'
import { useSelector } from "react-redux"

export default function Layout({children}){

    const router = useRouter()
    const [ loading, setLoading ] = useState(false)
  
    useEffect(() => {
  
      const handleStart = (url) => {
        if(url !== router.asPath){
          setLoading(true)
        }
      }
  
      const handleComplete = (url) => {
        if(url === router.asPath){
          setLoading(false)
          setTimeout(() =>{setLoading(false)},5000)
        }
      }
  
      router.events.on("routeChangeStart", handleStart)
      router.events.on("routeChangeComplete", handleComplete)
      router.events.on("routeChangeError", handleComplete)
      console.log(loading)
  
      return () => {
        router.events.off("routeChangeStart", handleStart)
        router.events.off("routeChangeComplete", handleComplete)
        router.events.off("routeChangeError", handleComplete)
      }
    })

  const [ mobile, setMobile ] = useState(false)
  const homePage = router.pathname == "/account/signup" || router.pathname == "/account/login" || router.pathname.startsWith("/admin") ? false : true
  const home = router.pathname === "/" ? true : false
  
  useEffect(() => {
    console.log(mobile)
  }, [mobile])

  const [ discountHeader, setDiscountHeader ] = useState(true)
  const coupon = useSelector((state) => state.coupon.coupons)

  return (
    <>
      {
      loading === true ? 
      <div className="h-screen flex items-center justify-center">
        <CircularProgress/>
      </div>
      :
      <div className={mobile == true ? "overflow-y-hidden" : ""}>
          {
            homePage && 
            <>
              <Header/>
              { home && coupon != null && discountHeader === true ? <DiscountHeader close={() => setDiscountHeader(false)}/> : null}
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
      }
    </>
  )
}
