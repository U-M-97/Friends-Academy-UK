import axios from "axios"
import { useState, useEffect } from "react"
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";

const videosRequests = () => {

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

    useEffect(() => {
        getRequests()
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <FullLayout>
                {req && req.requests.map((item) => {
                    return (
                        <div key={item} className="flex items-center justify-around">
                            <p className="font-bold">{item.email}</p>
                            <p>{item.username}</p>
                            <button className="px-10 bg-green" onClick={() => handleApprove(item._id)}>Approve</button>
                            <button className="px-10 bg-red-600 text-white">Remove</button>
                        </div>
                    )
                })}
            </FullLayout>
        </ThemeProvider>
    )
}

export default videosRequests