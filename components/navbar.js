import Image from "next/image"
import style from "../styles/navbar.module.css"
import Link from "next/link"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState, useEffect } from "react";

const Navbar = () => {

    const [ mouseEnter , setMouseEnter ] = useState(false)
    const [ isClicked, setIsClicked ] = useState(false)

    useEffect(() => {

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
            document.addEventListener("mousedown", handleKey)
    }
    }, [])

    const handleDropDown = () => {
        setMouseEnter(false)
        setIsClicked(!isClicked)
    }

  return (
    <>
        <div className={style.border}></div>
        <div className="flex font-main justify-center">
            <div className=" flex items-center justify-center ml-10 w-72">
                <Image src="/images/Friends Academy.png" alt="logo" height={"130px"} width={"300px"} objectFit="cover"/>
            </div>
        
           <ul className="flex ml-40 items-center">
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
                        
                        </div> :null
                    }                   
                </div>
                   
                <li className="mr-8 hover:text-green duration-200">
                    <Link href="">
                        <a>CONTACT</a>
                    </Link>
                </li>
           </ul>
        </div>
    </>
   
  )
}

export default Navbar