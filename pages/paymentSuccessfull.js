import Link from "next/link"
import { useEffect, useState } from "react"
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useRouter } from "next/router"
const PaymentSuccessfull = () => {

  const [ text, setText ] = useState()
  const params = window.location.search
  const router = useRouter()

  useEffect(() => {
    if(params == "?CoursePayment"){
      setText("Booking")
    }else if(params == "?RoomPayment"){
      setText("Room Booking")
    }
  }, [])

  return (
    <>
    {/* {text &&  */}
    <div className="flex flex-col items-center justify-center mt-20 font-main">
        <h1 className="text-6xl">Thank You</h1>
        <p className="text-2xl mt-5">Your {text} is completed successfully. You can check your booking in your profile</p>
        <p className="text-xl font-bold mt-6">Please follow the link to join the whats app group. All correspondence will be through this group</p>
        <a href='https://chat.whatsapp.com/DmtFLreT6aQBEOoxVrSNnO' target="_blank" rel="noreferrer" className='flex items-center justify-center text-white  py-2 px-10 duration-300 cursor-pointer mr-4 bg-whatsapp mt-4'>
          <WhatsAppIcon className="scale-150"/>
          <p className="text-xl ml-5 font-bold">Join Group</p>
        </a>
        <div className="flex my-10">
            <Link href="/">
                <button className="mx-5 bg-green px-5 py-2 font-bold hover:bg-greenHover">Back to Home Page</button>
            </Link>
            <Link href="/">
                <button className="mx-5  bg-green px-5 py-2 font-bold hover:bg-greenHover">Go to Profile</button>
            </Link>
        </div>
    </div>
      {/* } */}
    
      </>
  )
}

export default PaymentSuccessfull