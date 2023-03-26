import videojs from 'video.js';
import 'video.js/dist/video-js.css';
// import 'videojs-contrib-quality-levels';
import { useRef, useEffect } from "react"

const VideoPlayer = ({url, sources, options}) => {
    
    const videoRef = useRef(null)

    useEffect(() => {
        console.log(url)
        const videoJsoptions = {
            ...options,
            sources,
            controls: true,
            autoplay: false,
            preload: "auto",
            fluid: true,
            aspectRatio: "16:9",
            fill: true,
        }

        const player = videojs(videoRef.current, videoJsoptions)
        player.src(url)

    }, [url, sources, options])

    const videoStyle = {
        height: "500px",
        width: "1100px",
        position: "relative",
        display: "flex",
    }

    return(
        <div data-vjs-player className=' flex items-center justify-center '>
            <div className='video-js vjs-default-skin' style={videoStyle}> 
                <video ref={videoRef} onContextMenu={(e) => e.preventDefault()}   />
            </div>           
        </div>
    )
}

export default VideoPlayer