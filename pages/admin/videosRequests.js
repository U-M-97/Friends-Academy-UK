import axios from "axios"
import { useState, useEffect } from "react"
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import dayjs from "dayjs";

const VideosRequests = () => {

    const [ req, setReq ] = useState()

    const getRequests = async () => {
        const res = await axios.get(`${process.env.url}/videosAdmin`)
        setReq(res.data)
        console.log(res.data)
    }

    const handleApprove = async (id) => {
        const res = await axios.post(`${process.env.url}/videosAdmin`, {id})
        getRequests()
    }

    const handleRemoveReq = async (id) => {
        const res = await axios.delete(`${process.env.url}/videosAdmin`, {params:{id, type: "remove request"}})
        getRequests()
    }

    const handleRemoveAccess = async (id) => {
        const res = await axios.delete(`${process.env.url}/videosAdmin`, {params:{id, type: "remove access"}})
        getRequests()
    }

    useEffect(() => {
        getRequests()
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <FullLayout>
                <h1 className="text-xl font-bold">Requests</h1>
                {req && req.requests.map((item) => {
                    return (
                        <div key={item} className="flex mt-2">
                            <p className="font-bold w-60">{item.email}</p>
                            <p className="w-60 ml-10">{item.username}</p>
                            <button className="px-10 ml-10  bg-green" onClick={() => handleApprove(item._id)}>Approve</button>
                            <button className="px-10 ml-10  bg-red-600 text-white" onClick={() => handleRemove(item._id)}>Remove</button>
                        </div>
                    )
                })}
                <h1 className="text-xl font-bold mt-10">Accesses</h1>    
                {req && req.access.map((item) => {
                    return (
                        <div key={item} className="flex mt-2">
                            <p className="font-bold w-60">{item.user.email}</p>
                            <p className="w-60 ml-10">{item.user.username}</p>
                            <p className="w-60 ml-10">Started on {dayjs(item.time).format("DD/MM/YYYY")}</p>
                            <button className="px-10 ml-10  bg-red-600 text-white" onClick={() => handleRemoveAccess(item.user._id)}>Remove</button>
                        </div>
                    )
                })}
            </FullLayout>
        </ThemeProvider>
    )
}

export default VideosRequests