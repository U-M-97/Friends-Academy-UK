import Image from "next/image"
import Link from "next/link"

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-lightGray font-main">
        <div className="flex h-slider w-aboutWidth shadow-lg shadow-gray rounded-2xl">
            <div className="relative h-full w-full flex-1 overflow-hidden rounded-l-2xl">
                <Image src="/images/loginpage.jpg" layout="fill" objectFit="cover" />
            </div>
            <div className="flex-1 flex flex-col items-center bg-login justify-center rounded-r-2xl">
                <h1 className="font-bold text-2xl">Welcome to Friends Academy UK</h1>
                <input placeholder="Email" className="p-3 w-96 rounded-sm outline-none hover:outline-pink focus:outline-pink mt-10"/>
                <input placeholder="Password" type="password" className="p-3 w-96 rounded-sm outline-none hover:outline-pink focus:outline-pink mt-5"/>
                <button className="bg-green hover:bg-greenHover text-xl p-3 rounded-sm w-96 mt-5">Login</button>
                <label className="mt-1">OR</label>
                <a href="/api/google/authGoogle" className="bg-white hover:bg-googleHover p-1 rounded-sm w-96 mt-1 items-center flex cursor-pointer">
                    <div className="relative h-10 w-10 ml-20">
                        <Image src="/images/google.png" layout="fill" objectFit="cover"/>
                    </div>
                    <p className="ml-3 text-gray">Sign in with Google</p>
                </a>
                <a href="/api/facebook/authFacebook" className="bg-facebook p-1 rounded-sm w-96 mt-2 flex items-center hover:bg-facebookHover">
                    <div className="relative h-11 w-11 ml-20">
                        <Image src="/images/facebook.png" layout="fill" objectFit="cover"/>
                    </div>
                    <p className="ml-2 text-white">Sign in with Facebook</p>
                </a>
                <div className="flex mt-10">
                     <h1 className="">Don't have an account yet?</h1>
                     <a className="ml-2 underline hover:text-green">
                        <Link href="/account/signup">Sign Up</Link>
                     </a> 
                </div>
              
            </div> 
        </div>
    </div>
  )
}

export default Login