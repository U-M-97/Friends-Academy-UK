import VideoPlayer from "../components/VideoPlayer"
import axios from "axios";
import Head from 'next/head'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from "next/router";

const Video = () => {

    const [ videos, setVideos ] = useState()
    const [ access, setAccess ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    const  [ message, setMessage ] = useState("")
    const [ selectedVideo, setSelectedVideo ] = useState()
    const user = useSelector((state) => state.user.currentUser) 
    const router = useRouter()

    const getVideos = async () => {
        const files = await axios.get(`${process.env.url}/videosClient`, { params: { id : user._id }})
        if(files.data === "Access Denied"){
            setAccess(false)
        }else{
            setAccess(true)
            setVideos(files.data)
        }
        
    }

    useEffect(() => {
        if(!user){
            router.push("/account/login")
        }
        user && getVideos()
    }, [])

    const options = {
        aspectRatio: '16:9',
        playbackRates: [0.5, 1, 1.5, 2],
    };

    const sendAccessReq = async () => {
        setLoading(true)
        setMessage("")
        const res = await axios.post(`${process.env.url}/videosClient`, {id: user._id})
        if(res.data === "Request Sent Successfully"){
            setLoading(false)
            setMessage("Request Sent Successfully")
        }
        else if(res.data === "Already Requested"){
            setLoading(false)
            setMessage("Already requested")
        }
        else{
            setLoading(false)
            setMessage("Failed to send request Try Again")
        }
    }
    console.log(message)
    
    if(access === null){
        return(
            <div className="flex items-center justify-center h-slider">
                <CircularProgress/>
            </div>
        )
    }
    
    return (
        <div className="flex items-center font-main justify-center">
            <Head>
                <title>Friends Academy UK</title>
                <link rel="icon" href="/images/Friends Academy.png"/>
            </Head>
            {
                access === true ? 
                    <div className="flex my-10 px-10">
                        <div className="flex flex-col h-accommodation overflow-y-auto px-2">
                        {
                            videos && videos.map((video) => {
                                return (
                                    <div className={`border border-pink rounded-md flex items-center px-2 py-1 cursor-pointer my-1 ${selectedVideo === video.url ? `bg-pink text-white` : null}`} key={video} onClick={() => setSelectedVideo(video.url)}>
                                        <h1 className="text-2xl font-bold">{video.file.name}</h1>
                                    </div>
                                )
                            })
                        }
                        </div>
                        <div className="ml-5 w-videoContainer">
                        {
                            selectedVideo && 
                            <VideoPlayer url={selectedVideo}
                            sources={selectedVideo}
                            options={options}
                            />
                        }
                        </div>
                        
                    </div>
                 : 
                <div className="flex flex-col h-96 items-center justify-center">
                    <p className="text-rose-600 font-bold text-4xl">You dont have access to Videos</p>
                    { loading === false ? <button className="mt-10 text-4xl bg-green w-96 py-3 rounded-md font-bold" onClick={sendAccessReq}>Send Access Request</button> : <div className="mt-10 text-4xl bg-green flex items-center justify-center w-96 py-3 rounded-md font-bold"><CircularProgress sx={{color: "#e75387"}}/></div>  }
                    { message !== "" ?  <p className={`text-2xl mt-6 px-10 py-2 font-bold ${message === "Failed to send request Try Again" ? `bg-red-600` : `bg-emerald-200`}`}>{message} </p>: null}
                </div>
            }
        </div>
    )
}

export default Video