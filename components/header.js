import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import styles from "../styles/header.module.css"
import { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Header = () => {

    const [banner, setBanner] = useState(true)

    return(
        <div className='font-main overflow-hidden'>
            {banner == true ? <div className={styles.headerOpen}>
                <div className={styles.headerContainer}>
                    <p className='mr-1 text-green'>Our New Address : </p>
                    <p className='mr-10'>113 - 115 Smedley Road, MANCHESTER</p>
                    <p className='mr-1 text-green'>Postcode : </p>
                    <p className='mr-10'>M8 0RS</p>
                    <p className='mr-1 text-green'>For more information contact : </p>
                    <p>07532707561</p>
                </div>
            </div>
            : null
            }
            
            
            <div className='flex justify-center sm:p-4 relative'>
                <div className='absolute right-5 top-0 bg-green text-black cursor-pointer rounded-b-md sm:p-1' onClick={() => setBanner(!banner)}>
                    {banner == true ? <ClearIcon className='scale-75 md:scale-100'/> : <KeyboardArrowDownIcon/>}
                </div>
                <div className='flex mt-5 flex-col w-screen sm:mt-0 sm:flex-row sm:w-width sm:justify-between'>
                    <div className='px-3 sm:p-0 flex justify-between sm:ml-32'>
                        <div className='flex cursor-pointer'>
                            <PhoneIcon className='text-green'/>
                            <address className='text-font not-italic hover:text-green duration-200'>+ 00 4475 32707561</address>
                        </div>
                        <div  className='flex cursor-pointer sm:ml-8'>
                            <MailIcon className='text-green'/>
                            <address className='text-font not-italic hover:text-green duration-200'>mail@domain.com</address>
                        </div>    
                    </div>

                    <div className='border-b border-lightGray mt-2 sm:hidden'></div>
                    
                    <div className='flex justify-center mt-2 sm:mr-40 sm:mt-0'>
                        <div className='hover:text-green duration-300 cursor-pointer mr-4'>
                            <WhatsAppIcon/>
                        </div>
                        <div className='hover:text-green duration-300 cursor-pointer mr-4'>
                            <FacebookIcon/>
                        </div>  
                        <div className='hover:text-green duration-300 cursor-pointer mr-4'>
                            <YouTubeIcon/>
                        </div>
                        <div className={styles.line}></div>
                        <div className='mr-4 text-gray cursor-pointer'>
                            <SearchIcon className=' scale-125'/>
                        </div>
                    </div>    
                    <div className='border-b border-lightGray mt-2 sm:hidden'></div>    
                </div>                
            </div>
        </div>
        
    )
}

export default Header