import PaidIcon from '@mui/icons-material/Paid';
import PeopleIcon from '@mui/icons-material/People';
import HandshakeIcon from '@mui/icons-material/Handshake';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { FiBookOpen } from 'react-icons/fi';
import SchoolIcon from '@mui/icons-material/School';
import { motion } from 'framer-motion';

const Services = () => {

  return (
    <div className="font-main flex flex-col justify-center items-center my-10 bg-servicesBG">
      <h1 className="mt-10 text-4xl font-bold">Our Services</h1>
      <div className="w-56 mt-2 flex items-center justify-center">
        <div className="border-b-2 w-28 border-green"></div>
        <div className='mx-3'>
            <div className="h-2 w-2 rounded-full bg-pink"></div>
        </div>  
        <div className="border-b-2 w-28 border-green"></div>
      </div>
      <div className="mt-20 flex items-center justify-center ">
        <motion.div
        
        className="h-card w-card rounded-xl p-8 mx-5 hover:bg-green hover:text-white duration-200 group">
          <PaidIcon className='scale-services ml-4 mt-6 text-green group-hover:text-white '/>
          <h1 className='mt-11 text-2xl font-bold'>Pay Only Once</h1>
          <p className='mt-4 text-lg'>Coaching starts by declaring a powerful future. Let me help you realize your business goals and achieve success.</p>
        </motion.div>
        <div className=" h-card w-card rounded-xl p-8 mx-5 hover:bg-green hover:text-white duration-200 group">
          <PeopleIcon className=' scale-services ml-5 mt-6 text-green group-hover:text-white'/>
          <h1 className='mt-11 text-2xl font-bold'>Interactive PLAB 2 Practice Sessions</h1>
          <p className='mt-4 text-lg'>Coaching starts by declaring a powerful future. Let me help you realize your business goals and achieve success.</p>
        </div>
        <div className=" h-card w-card rounded-xl p-8 mx-5 hover:bg-green hover:text-white duration-200 group">
          <HandshakeIcon className=' scale-services ml-4 mt-6 text-green group-hover:text-white'/>
          <h1 className='mt-11 text-2xl font-bold'>Unlimited Career Support</h1>
          <p className='mt-4 text-lg'>Coaching starts by declaring a powerful future. Let me help you realize your business goals and achieve success.</p>
        </div> 
      </div>

      <div className="mt-10 flex items-center justify-center ">
        <div className="h-card w-card rounded-xl p-8 mx-5 hover:bg-green hover:text-white duration-200 group">
          <AssignmentIndIcon className=' scale-services ml-4 mt-6 text-green group-hover:text-white'/>
          <h1 className='mt-11 text-2xl font-bold'>Support with CV Building</h1>
          <p className='mt-4 text-lg'>Coaching starts by declaring a powerful future. Let me help you realize your business goals and achieve success.</p>
        </div>
        <div className="h-card w-card rounded-xl p-8 mx-5 hover:bg-green hover:text-white duration-200 group">
          <AiOutlineFileSearch className=' scale-services ml-3 mt-6 text-green group-hover:text-white'/>
          <h1 className='mt-11 text-2xl font-bold'>Support with Job Search</h1>
          <p className='mt-4 text-lg'>Coaching starts by declaring a powerful future. Let me help you realize your business goals and achieve success.</p>
        </div>
        <div className="h-card w-card rounded-xl p-8 mx-5 hover:bg-green hover:text-white duration-200 group">
          <FiBookOpen className=' scale-services ml-4 mt-6 text-green group-hover:text-white'/>
          <h1 className='mt-11 text-2xl font-bold'>Interview Guidance</h1>
          <p className='mt-4 text-lg'>Coaching starts by declaring a powerful future. Let me help you realize your business goals and achieve success.</p>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center">
        <div className="h-card w-card rounded-xl p-8 mx-5 hover:bg-green hover:text-white duration-200 group">
          <SchoolIcon className=' scale-services ml-4 mt-6 text-green group-hover:text-white'/>
          <h1 className='mt-11 text-2xl font-bold'>Online and Onsite PLAB 2 Courses</h1>
          <p className='mt-4 text-lg'>Coaching starts by declaring a powerful future. Let me help you realize your business goals and achieve success.</p>
        </div>
        
      </div>

    </div>
  )
}

export default Services