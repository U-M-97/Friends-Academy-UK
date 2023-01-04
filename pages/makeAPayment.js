import CircularProgress from '@mui/material/CircularProgress';
import { useState } from "react"
import axios from 'axios';

const MakeAPayment = () => {

    const [ reqApi, setReqApi ] = useState(false)

    const handleVerify = () => {
        setReqApi(true)
        
    }

  return (
    <div className="h-96 mt-10 font-main">
        <div className="flex flex-col items-center justify-center ">
            <h1 className="font-bold text-xl">Enter your Booking ID here</h1>
            <input className="px-5 py-3 rounded-md mt-5 w-96 border"/>
            <button className='mt-5 bg-green font-bold w-40 py-2 rounded-md text-xl hover:bg-greenHover' onClick={handleVerify}>Verify</button>
            
        </div>
        
    </div>
  )
}

export default MakeAPayment