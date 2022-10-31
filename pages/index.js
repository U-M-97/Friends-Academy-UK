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
import { loginSuccess, logout } from "../redux/userReducer"
import { addCourse } from "../redux/courseReducer"

export default function Home(props) {

  const dispatch = useDispatch()
  // console.log(props.courses, props.user)
  dispatch(addCourse(props.courses))
  if(props.user === "Token is not Valid"){
    dispatch(logout())
  }
  else{
    dispatch(loginSuccess(props.user))
  }

  return (
    <div className=''>
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
  console.log(cookieExist)
  
  const userData  = await axios.post("http://localhost:3000/api/userData", {cookieExist})
  const coursesData = await axios.get("http://localhost:3000/api/courses")
  const user = userData.data
  const courses = coursesData.data

  return { props: { user, courses} }
}
