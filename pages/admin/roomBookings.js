import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { useEffect, useState } from "react"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from "axios"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, MenuItem, Avatar } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ConditionalRendering from "./conditionalRendering";

const RemoveCourse = () => {

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const [ columns, setColumns ] = useState([])
  const [ date, setDate ] = useState(dayjs(new Date()).startOf("month"))
  const [ firstRender, setFirstRender ] = useState(false)
  const [ displayColumn, setDisplayColumn ] = useState()
  const [ rooms, setRooms ] = useState()
  const [ dialog, setDialog ] = useState(false)
  const [ inputs, setInputs ] = useState({
    roomId: "",
    memberId: "",
    name: "",
    gender: "",
    phone: "",
    country: "",
    email: "",
    checkIn: "",
    checkOut: "",
    bed: "",
    payment: ""
  })
  const [ apiRes, setApiRes ] = useState(false)
  const [ muiCheckInDate, setMuiCheckInDate ] = useState(dayjs(date))
  const [ muiCheckOutDate, setMuiCheckOutDate ] = useState(null)
  const [ selectedRoom, setSelectedRoom ] = useState()
  const [ reqMethod, setReqMethod ] = useState()
  const [ delButton, setDelButton ] = useState(false)

  const handleChange = (e) => {
    const {name, value} = e.target
    setInputs((prev) => ({
        ...prev, [name]:value
    }))
  }

  const handleCheckInDate = () => {
    setInputs((current) => {
      return{
        ...current, checkIn: dayjs(muiCheckInDate).format("DD/MM/YYYY")
      }
    })
  }
  
  const handleCheckOutDate = () => {
    muiCheckOutDate && setInputs((current) => {
      return{
        ...current, checkOut:  dayjs(muiCheckOutDate).format("DD/MM/YYYY")
      }
    })
  }

  const getRooms = async () => {
    const rooms = await axios.get(`${process.env.url}/room`)
    setRooms(rooms.data)
  }

  const getColumns = () => {

    let localDate = dayjs(date)
    let arr = []

    for(let i = 0; i < date.daysInMonth(); i++){
      if(localDate.isSame(localDate.startOf("month"))){
        arr.push(localDate)
        localDate = localDate.add(1, "day")
      }else{
        arr.push(localDate)
        localDate = localDate.add(1, "day")
      }
    }
    console.log(arr)
    setColumns(arr)

    if(firstRender == false){
      setFirstRender(true)
    }
  }

  useEffect(() => {
    setDisplayColumn(columns.slice(0, columns.length / 2))
  }, [columns])

  useEffect(() => {
    getColumns()
    getRooms()
  }, [])  
  
  const handleNext = () => {
    if(displayColumn[0].isSame(date.startOf("month"))){
      setDisplayColumn(columns.slice(columns.length / 2))
    }else{
      setDate(date.add(1, "month"))
    }
  } 

  const handlePrevious = () => {
    if(displayColumn[displayColumn.length - 1].isSame(date.endOf("month").set("hour", 0).set("minute", 0).set("second", 0).set("millisecond", 0))){
      console.log("running")
      setDisplayColumn(columns.slice(0, columns.length / 2))
    }else{
      setDate(date.subtract(1, "month"))
    } 
  }

  useEffect(() => {
    if(firstRender === true){
      getColumns()
    }
  }, [date])

  const handleClose = () => {
    console.log("asdkjhaskljdklas")
    setDialog(false)
  }

  const handleOpen = (column, room) => {
    setDelButton(false)
    console.log(column, room)
    setDialog(true)
    setSelectedRoom(room)
    setReqMethod("Add Member")
    setMuiCheckInDate(dayjs(column))
    setMuiCheckOutDate(null)
    setInputs(null)
    setInputs((input) => ({ ...input, roomId: room._id}))
}

  useEffect(() => {
    handleCheckInDate()
  }, [muiCheckInDate])

  useEffect(() => {
    handleCheckOutDate()
  }, [muiCheckOutDate])

const handleSave = async () => {
  const data = {
    id: selectedRoom._id,
    inputs: inputs,
    reqMethod: reqMethod
  }
  const res = await axios.put(`${process.env.url}/room`, data)
  if(res.data === "Booking Added Successfully" || res.data === "Member Updated Successfully"){
    handleClose()
    getRooms()
  }
}

const handleInputs = (column, room, member) => {
  setSelectedRoom(room)
  setDelButton(true)
  setDialog(true)
  console.log(member)
  setMuiCheckInDate(dayjs(member.checkIn, "DD/MM/YYYY"))
  setMuiCheckOutDate(dayjs(member.checkOut, "DD/MM/YYYY"))
  setReqMethod("Update Member")
  setInputs((input) => ({
    ...input,roomId: room._id, memberId: member._id, name: member.name, gender: member.gender, phone: member.phone, country: member.country, email: member.email, checkIn: member.checkIn, checkOut: member.checkOut, bed: member.bed, payment: member.payment
  }))
}

const handleDelete = async () => {
  const data = {
    reqMethod: "Delete Booking",
    roomId: inputs.roomId,
    memberId: inputs.memberId
  }
  const res = await axios.delete(`${process.env.url}/room`, { data })
}

  return (
     <ThemeProvider theme={theme}>
        <FullLayout>
          <div className="font-main">
            <h1 className="font-bold text-xl text-center">Room Reservations</h1>
            <div className="flex items-center justify-center py-5">
              <button className="mx-5 text-green hover:bg-greenHover hover:text-white rounded-full p-1" onClick={handlePrevious}><ArrowBackIosNewIcon/></button>
              <p className="text-xl font-bold">{columns && <div>{date.format("MMMM")} {date.format("YYYY")}</div>}</p>
              <button className="mx-5 text-green hover:bg-greenHover hover:text-white rounded-full p-1" onClick={handleNext}><ArrowForwardIosIcon/></button>
            </div>
            <div className="flex border-y border-gray">
              <div className="flex items-center w-44 break-words justify-center border-r border-gray">
                <p className="text-xl">Rooms</p>
              </div>
              {displayColumn && displayColumn.map((column) => {
                return(
                  <div className="flex flex-col items-center justify-center py-2 w-20 border border-black" key={column}>
                    <p>{dayjs(column).format("DD")}</p>
                    <p>{dayjs(column).format("dddd").slice(0,3)}</p>
                  </div>
                )
              })}
            </div>
            <div>
              {rooms && rooms.map((room) => {
                return(
                  <div className="flex border-b border-gray" key={room}>
                    <div className="flex items-center justify-center border-r border-gray w-44 break-words">
                      <p className="text-xl">{room.roomTitle}</p>
                    </div>
                    {displayColumn && displayColumn.map((column) => {
                      return(
                        <div className="flex flex-col items-center h-20 justify-center w-20 border border-black cursor-pointer hover:bg-lightGray" key={column}>
                          {
                            room.roomMembers.length != 0 ? room.roomMembers.map((member) => {
                              return(
                                <>
                                <div className="relative h-full flex w-full" key={member}>
                                  <ConditionalRendering column={column} member={member} displayColumn={displayColumn} handleInputs={() => handleInputs(column, room, member)} handleOpen={() => handleOpen(column, room)}/>
                                </div>
                                </>
                              )
                            }) : 
                            <div onClick={() => handleOpen(column, room)} className="h-full w-full flex items-center justify-center">
                              <AddCircleIcon className="text-green"/> 
                            </div>
                          }
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>

          <Dialog open={dialog} onClose={handleClose} scroll="paper">
            <DialogTitle style={{fontSize: "20px" , fontWeight: "600"}}>Booking Menu</DialogTitle>
            <DialogContent className="w-aboutPic">
            {  
                inputs && apiRes == false ?
                <div className="flex flex-col items-center justify-center">
                <div className="mt-4 relative">
                    <TextField
                    autoFocus
                    name="name"     
                    margin="normal"
                    label="Guest Name"
                    fullWidth
                    variant="standard"
                    defaultValue={inputs.name}
                    onChange={handleChange}
                    />
                    <TextField
                    name="gender"     
                    margin="normal"
                    label="Gender"
                    fullWidth
                    variant="standard"
                    defaultValue={inputs.gender}
                    onChange={handleChange}
                    />
                    <TextField
                    name="phone"     
                    margin="normal"
                    label="Phone"
                    fullWidth
                    variant="standard"
                    defaultValue={inputs.phone}
                    onChange={handleChange}
                    />
                    <TextField
                    name="country"     
                    margin="normal"
                    label="Country"
                    fullWidth
                    variant="standard"
                    defaultValue={inputs.country}
                    onChange={handleChange}
                    />
                    <TextField
                    name="email"     
                    margin="normal"
                    label="Email"
                    fullWidth
                    variant="standard"
                    defaultValue={inputs.email}
                    onChange={handleChange}
                    />
                    <div className="mt-10">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker 
                          label="Check In"
                          inputFormat="DD/MM/YYYY"
                          value={muiCheckInDate}
                          onChange={setMuiCheckInDate}
                          renderInput={(params) => <TextField {...params} />}
                        />
                        <div className="mt-10">
                          <DesktopDatePicker
                            label="Check Out"
                            inputFormat="DD/MM/YYYY"
                            value={muiCheckOutDate}
                            onChange={setMuiCheckOutDate}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </div>                       
                      </LocalizationProvider>
                    </div>
                    <TextField
                    name="bed"     
                    margin="normal"
                    label="Bed"
                    fullWidth
                    variant="standard"
                    defaultValue={inputs.bed}
                    onChange={handleChange}
                    />
                    <TextField
                    type="number"
                    inputProps={{min: 0}}
                    name="payment"     
                    margin="normal"
                    label="Payment"
                    fullWidth
                    variant="standard"
                    defaultValue={inputs.payment}
                    onChange={handleChange}
                    />
                </div>
                </div> : 
                <div className="h-full flex items-center justify-center">
                  <CircularProgress/> 
                </div>     
            }
            
            </DialogContent>
            <DialogActions className=" border-lightGray border-t">
            <button onClick={handleClose} className="text-xl px-4 py-1 font-medium rounded-md">Cancel</button>
            {delButton === true ? <button onClick={handleDelete} className="text-xl text-white bg-red-600 px-4 py-1 font-medium hover:bg-red-500 rounded-md">Delete</button> : null }
            <button onClick={handleSave} className="text-xl bg-dashboard px-4 py-1 font-medium hover:bg-green rounded-md">Save</button>
            </DialogActions>
          </Dialog>
        </FullLayout>
    </ThemeProvider>
  )
}

export default RemoveCourse