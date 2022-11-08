import Image from "next/image"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import Link from "next/link"
import { useRouter } from "next/router"
import axios from "axios"
import { loadStripe } from '@stripe/stripe-js'
const { REACT_APP_URL } = process.env

const Booking = () => {

    const stripePromise = loadStripe(process.env.stripe_public_key);
    const selectedCourse = useSelector((state) => state.course.selectedCourse)
    console.log(selectedCourse)
    const [phone, setPhone] = useState()
    const user = useSelector((state) => state.user.currentUser)
    const router = useRouter()
    user == null ? router.push("/account/login") : null
    const [ valueCalendar, setValueCalendar ] = useState(new Date())
    const [ calendar, setCalendar ] = useState(false)
    const [ plab2, setPlab2 ] = useState(null)
    const [ prevAttempt, setPreviousAttempt ] = useState()
    
    const formatDate = () => {
        const day = valueCalendar.getDate()
        const month = valueCalendar.getMonth() + 1
        const year = valueCalendar.getFullYear()
        const result = `${day}/${month}/${year}`
        setPlab2(result)
    }

    useEffect(() => {
        setCalendar(false)
        if(calendar == true){
            formatDate()
        }
    }, [valueCalendar])

    useEffect(() => {
        
        const handleKey = (e) => {
            const link = document.getElementById("calendar")
            link && link.contains(e.target) ? null : setCalendar(false)
        }
        document.addEventListener("mousedown" , handleKey)
        
        return () => {
            document.removeEventListener("mousedown", handleKey)
    }
    }, [calendar])

    const handlePay = async () => {
        const stripe = await stripePromise
        console.log(plab2, prevAttempt, phone)
        if(user.plab2Date !== undefined){
            if(prevAttempt != null && phone != null){
                console.log("Running")
                axios.put(`${process.env.url}/userData`, {user, prevAttempt, phone})
            }
        }
        else{
            if(plab2 != null && prevAttempt != null && phone != null){
                console.log("Running2")
                axios.put(`${process.env.url}/userData`, {user, plab2, prevAttempt, phone})  
            }
        }
        const res = await axios.post(`${process.env.url}/checkout_sessions`, {user, selectedCourse}) 
        console.log(res.data.id)
        const result = await stripe.redirectToCheckout({
            sessionId: res.data.id
        })
    }

  return (
    <div className="flex items-center justify-center my-10 font-main">
        <div className="h-slider w-aboutWidth flex shadow-2xl shadow-gray">
            <div className="relative w-1/3">
                <Image src="/images/bg-main-desktop.png" layout="fill" objectFit="fill"/>
                <div className="absolute left-14 top-10 h-56 w-96">
                    <Image src="/images/bg-card-front.png" layout="fill"/>
                    <div className=" flex left-2 font-semibold tracking-debitCard absolute top-28 text-xl text-white">
                        <p className="ml-5 ">0000</p>
                        <p className="ml-5">0000</p>
                        <p className="ml-5">0000</p>
                        <p className="ml-5">0000</p>
                    </div>
                    <p className="tracking-name absolute text-white font-bold bottom-5 left-7">TOM CRUISE</p>
                    <p className="tracking-name absolute text-white font-bold bottom-5 right-7">00/00</p>
                </div>
                <div className="absolute top-72 left-14 h-56 w-96">
                    <Image src="/images/bg-card-back.png" layout="fill"/>
                </div>
            </div>
            <div className=" w-4/6">
                <div className="flex items-center justify-center">
                    <h1 className="ml-32 mt-10 text-xl font-bold">Welcome to Friends Academy Booking Area</h1>
                </div>
                <div className=" relative ml-28 mt-10 flex flex-col">
                    <h1 className="text-lg ">Tell us a bit about yourself</h1>
                    <PhoneInput
                    country={'pk'}
                    value={phone}
                    onChange={setPhone}
                    className="mt-10"
                    />
                    <input type="number" min="0" placeholder="Previous Plab 2 Attempts" className=" w-96 mt-10 border border-black py-4 px-3 rounded-md" value={prevAttempt} onChange={(e) => setPreviousAttempt(e.target.value)}/>
                    {user && !user.plab2Date ? <input placeholder="Your Plab 2 Exam Date" className=" w-96 mt-10 border border-black py-4 px-3 rounded-md" value={plab2} onClick={() => setCalendar(true)}/> : null}
                    {calendar && <div className="z-10 absolute bottom-40" id="calendar"> 
                    <Calendar  className=" bg-white border-2" onChange={setValueCalendar} value={valueCalendar}/>
                    </div> }
                    <button className="text-xl font-bold mt-10 py-3 bg-green hover:bg-greenHover rounded-md w-2/4" onClick={handlePay}>PAY NOW</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Booking