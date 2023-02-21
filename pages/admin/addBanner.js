import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Switch from '@mui/material/Switch';
import { TextField} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';

const AddBanner = () => {

    const [ inputs, setInputs ] = useState({
        tag: "",
        description: "",
        checked: undefined
    })
    const [ loading, setLoading ] = useState(false)

    useEffect(async () => {
        const res = await axios.get(`${process.env.url}/banner`)
        setInputs((input) => ({
            ...input, tag: res.data.tag, description: res.data.description, checked: res.data.checked
        }))
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target
        setInputs((prev) => ({
            ...prev, [name]:value
        }))
      }

    const handleSave = async () => {
        setLoading(true)
        const res = await axios.post(`${process.env.url}/banner`, inputs)
        if(res.data === "Banner Switched Off"){
            toast.info("Banner Switched Off")
            setLoading(false)
        }else if(res.data === "Banner is LIVE"){
            toast.success("Banner is LIVE")
            setLoading(false)
        }
    }

  return (
    <ThemeProvider theme={theme}>
        <FullLayout>
            <div>
                <div className="flex items-center justify-center  mb-5">
                    <p className="text-xl font-bold">Banner will look like</p>
                    <div>
                        <Switch checked={inputs.checked} className=" scale-125 ml-10" onClick={() => setInputs((input) => ({...input, checked: !input.checked}))}/>
                    </div>
                </div>

                <div className="font-main flex justify-between items-center border-t bg-saleHeader border-lightGray px-2 sm:px-7">
                    <div className="flex items-center justify-center sm:w-11/12 sm:h-10">
                        <motion.p className="font-bold sm:text-xl bg-white rounded-full px-2 sm:px-4 flex"
                        animate={{color: ["#000000", "#66ff99", "#000000",], scale: [0.9,1,0.9]}}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear"}}
                        >
                            <p>{inputs.tag} </p>
                        </motion.p>
                        <motion.p
                        animate={{scale: [1,1.04,1]}}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut"}}
                        className="ml-5 sm:text-xl font-medium">{inputs.description}</motion.p>
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <TextField
                name="tag"     
                margin="normal"
                label="Add Tag"
                fullWidth
                variant="standard"
                value={inputs.tag}
                onChange={handleChange}
                />
                <TextField
                name="description"     
                margin="normal"
                label="Add Description"
                fullWidth
                variant="standard"
                value={inputs.description}
                onChange={handleChange}
                />
            </div>
            <div className=" flex justify-center mt-5">
                { loading == false ? <button onClick={handleSave} className="text-xl bg-dashboard px-20 py-1 font-medium hover:bg-green rounded-md">Save</button> : 
                  <CircularProgress/>      }
            </div>
            <ToastContainer
            position="top-right"
            autoClose={10000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
        </FullLayout>
    </ThemeProvider>
  )
}

export default AddBanner