import Head from 'next/head'
import Image from 'next/image'
import Slider from '../components/slider'
import PlabInfo from '../components/plabInfo'
import Services from '../components/services'
import About from '../components/about'
import Contact from '../components/contact'
import Events from '../components/events'
import Accommodation from '../components/accomodation'
import Testimonials from '../components/testimonials'
import TrustedBy from '../components/trustedBy'
import { getCookie } from "cookies-next"
import axios from 'axios'
import { useDispatch } from "react-redux"
import { loginSuccess } from "../redux/userReducer"

export default function Home(props) {

  console.log(props.data)
  const dispatch = useDispatch()
  if(props.data === "Token is not Valid"){
    dispatch(loginSuccess(null))
  }
  else{
    dispatch(loginSuccess(props.data))
  }
 

  return (
    <div>
      <Head>
        <title>Friends Academy UK</title>
        <link rel="icon" href="/images/Friends Academy.png"/>
      </Head>
      <Slider/>
      <PlabInfo/>
      <Services/>
      <About/>
      <Testimonials/>
      <TrustedBy/>
      <Events/>
      <Accommodation/>
      <Contact/>
    </div>
  )
}

export async function getServerSideProps({req, res}) {

  const cookieExist = await getCookie("token", {req, res});
  
  const { data }  = await axios.post("http://localhost:3000/api/userData", {cookieExist})
  console.log(data)

  return { props: { data } }
}
