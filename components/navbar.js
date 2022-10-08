import Image from "next/image"
import style from "../styles/navbar.module.css"
import Link from "next/link"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState, useEffect } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';

const Navbar = (props) => {

    const [ mouseEnter , setMouseEnter ] = useState(false)
    const [ isClicked, setIsClicked ] = useState(false)
    const [ open, setOpen ] = useState(false)
    const user = useSelector((state) => state.user.user)
    console.log(user) 

    useEffect(() => {
        console.log("running")
        const handleKey = (e) => {
            const link = document.getElementById("moreInformation")
            const dropDown = document.getElementById("dropDown")
            const insideLink = link.contains(e.target)
            let insideDropDown
            if(dropDown){
                insideDropDown = dropDown.contains(e.target)
            }
            if(!insideLink && !insideDropDown){
                setIsClicked(false)
            }
        }

        document.addEventListener("mousedown" , handleKey)
        
        return () => {
            document.removeEventListener("mousedown", handleKey)
    }
    }, [])

    const handleDropDown = () => {
        setMouseEnter(false)
        setIsClicked(!isClicked)
    }

    const handleClick = () => {
        setOpen(!open)
        open == false ? props.on() : props.off()
    }

  return (
    <div className="">
        <div className={style.border}></div>
        
        <div className=" flex items-center justify-between px-6 mt-3 sm:hidden">
            <div className=" flex items-center justify-center">
                <Image src="/images/Friends Academy.png" alt="logo" height={"110px"} width={"300px"} objectFit="cover"/>
            </div>
            <div className="" onClick={handleClick}>
                <MenuIcon className="scale-150"/>
            </div>
        </div>
        
        <div className={`font-main fixed top-0 flex flex-col h-full w-screen bg-white duration-700 z-50 sm:hidden ${open == false ? " -translate-x-full" : " translate-x"}`}>
            <div className="flex justify-end mt-5">
                <div className="bg-green p-2 h-10 w-10 mr-5 rounded-md" onClick={handleClick}>
                    <CloseIcon className="scale-125"/>
                </div>
            </div>
            <ul className="mt-10">
                <li className="p-4 font-bold text-2xl border-b border-b-lightGray">Home</li>
                <li className="p-4 font-bold text-2xl border-b border-b-lightGray">About</li>
                <li className="p-4 font-bold text-2xl border-b border-b-lightGray">BOOK ONLINE</li>
                <li className="p-4 font-bold text-2xl border-b border-b-lightGray">OSCE BANK</li>
                <li className="p-4 font-bold text-2xl border-b border-b-lightGray">CANDIDATE REVIEWS</li>
                <li className="p-4 font-bold text-2xl border-b border-b-lightGray">BLOG</li>
                <li className="p-4 font-bold text-2xl border-b border-b-lightGray">GALLERY</li>
                <li className="p-4 font-bold text-2xl border-b border-b-lightGray">CONTACT</li>
            </ul>
        </div>
       
        <div className="hidden sm:flex font-main sm:justify-center">
            <div className=" flex items-center justify-center ml-10 w-72">
                <Image src="/images/Friends Academy.png" alt="logo" height={"130px"} width={"300px"} objectFit="cover"/>
            </div>
        
           <ul className={`flex ${user ? "ml-20" : "ml-40"} items-center`}>
                <li className="mr-8 hover:text-green duration-200">
                    <Link href="">
                        <a>HOME</a>
                    </Link>
                </li>

                <li className="mr-8 hover:text-green duration-200">
                    <Link href="">
                        <a>ABOUT</a>
                    </Link>
                </li>

                <li className="mr-8 hover:text-green duration-200">
                    <Link href="">
                        <a>BOOK ONLINE</a>
                    </Link>
                </li>

                <li className="mr-8 hover:text-green duration-200">
                    <Link href="">
                        <a>OSCE BANK</a>
                    </Link>
                </li>

                <li className="mr-8 hover:text-green duration-200">
                    <Link href="">
                        <a>CANDIDATE REVIEWS</a>
                    </Link>
                </li>

                <li className="mr-8 cursor-pointer hover:text-green duration-200" id="moreInformation" onMouseEnter={() => setMouseEnter(true)} onMouseLeave={() => setMouseEnter(false)} onClick={handleDropDown}>
                    <a>MORE INFORMATION</a>
                    <KeyboardArrowDownIcon/>
                </li>

                <div className="relative inline-block">
                    { mouseEnter == true || isClicked == true ? <div className="right-6 absolute w-52 top-2 z-30 bg-white" id="dropDown" onMouseEnter={() => setMouseEnter(true)} onMouseLeave={() => setMouseEnter(false)}>
                            <div className=" border-t-4 border-green mt-4"></div>
                            <ul>
                                <li className=" p-4 border-b border-lightGray cursor-pointer duration-300 hover:bg-green hover:text-white">
                                    <Link href="">
                                        <a>BLOG</a>
                                    </Link>
                                </li>

                                <li className=" p-4 border-b border-lightGray cursor-pointer duration-300 hover:bg-green hover:text-white">
                                    <Link href="">
                                        <a>GALLERY</a>
                                    </Link>
                                </li>
                            </ul>
                        
                        </div> : null
                    }                   
                </div>
                   
                <li className="mr-8 hover:text-green duration-200">
                    <Link href="">
                        <a>CONTACT</a>
                    </Link>
                </li>

                { user == null ? null : 
                <div className='mr-4 text-gray cursor-pointer'>
                    <div className=' h-20 w-20 relative overflow-hidden rounded-full'>
                        <Image src={"/images/avatar.png"} layout={"fill"} objectFit="cover" alt="profile picture"/>
                    </div>
                </div>
            }
           </ul>
        </div>
    </div>
  )
}

export default Navbar