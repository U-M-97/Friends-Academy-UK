import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import styles from "../styles/header.module.css"

const Header = () => {
    return(
        <div className='flex justify-center p-4 font-main'>
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
    )
}

export default Header