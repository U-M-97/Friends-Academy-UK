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
            
            
            <div className='flex justify-center p-4 relative'>
                <div className='absolute right-5 top-0 bg-green text-black cursor-pointer rounded-b-md p-1' onClick={() => setBanner(!banner)}>
                    {banner == true ? <ClearIcon/> : <KeyboardArrowDownIcon/>}
                </div>
                <div className='flex w-width justify-between'>
                    <div className='flex ml-32'>
                        <div className='flex cursor-pointer'>
                            <PhoneIcon className='text-green'/>
                            <address className='text-font not-italic hover:text-green duration-200'>+ 00 4475 32707561</address>
                        </div>
                        <div  className='flex cursor-pointer ml-8'>
                            <MailIcon className='text-green'/>
                            <address className='text-font not-italic hover:text-green duration-200'>mail@domain.com</address>
                        </div>    
                    </div>
                    
                    <div className='flex mr-40'>
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
                </div>                
            </div>
        </div>
        
    )
}

export default Header