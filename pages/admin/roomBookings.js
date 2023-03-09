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
import Alert from '@mui/material/Alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

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
    roomName: "",
    roomId: "",
    memberId: "",
    name: "",
    gender: "",
    phone: "",
    country: "",
    email: "",
    checkIn: "",
    checkOut: "",
    payment: "",
    status: undefined,
    previousRoom: undefined
  })
  const [ apiRes, setApiRes ] = useState(false)
  const [ muiCheckInDate, setMuiCheckInDate ] = useState(null)
  const [ muiCheckOutDate, setMuiCheckOutDate ] = useState(null)
  const [ selectedRoom, setSelectedRoom ] = useState()
  const [ reqMethod, setReqMethod ] = useState()
  const [ delButton, setDelButton ] = useState(false)
  const [ alreadyBooked, setAlreadyBooked ] = useState(false)
  const [ roomError, setRoomError ] = useState(false)
  const [ open, setOpen ] = useState(false);
  const [ deleting, setDeleting ] = useState(false)

  const handleChange = (e) => {
    const {name, value} = e.target
    setInputs((prev) => ({
        ...prev, [name]:value
    }))
  }

  const calculatePayment = () => {
    let price
    if(inputs.roomName.includes("Single")){
      price = 25
    }else{
      price = 20
    }
    if(muiCheckOutDate){
      console.log(price)
      const totalAmount = Math.max(0, muiCheckOutDate.diff(muiCheckInDate, "day") + 1) * price
      console.log(totalAmount)
      setInputs((input) => ({
        ...input, payment: totalAmount
      }))
    }
  }

  const handleCheckInDate = () => {
    setInputs((current) => {
      return{
        ...current, checkIn: dayjs(muiCheckInDate)
      }
    })
  }

  const handleCheckOutDate = () => {
    muiCheckOutDate && setInputs((current) => {
      return{
        ...current, checkOut:  dayjs(muiCheckOutDate)
      }
    })
    calculatePayment()
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
    setAlreadyBooked(false)
    setDialog(false)
  }

  const handleOpen = () => {
    setInputs((input) => ({
      ...input, roomName: "", roomId: "", memberId: "", name: "",  gender: "", phone: "", country: "", email: "", checkOut: "", payment: ""
    }))
    setDelButton(false)
    setDialog(true)
    setReqMethod("Add Member")
    setMuiCheckOutDate(null)
    setSelectedRoom(null)
}

  useEffect(() => {
    handleCheckInDate()
  }, [muiCheckInDate])

  useEffect(() => {
    handleCheckOutDate()
  }, [muiCheckOutDate])

const handleSave = async () => {
  if(inputs.roomId != ""){
    setRoomError(false)
    setApiRes(true)
    setAlreadyBooked(false)
    const data = {
      inputs: inputs,
      reqMethod: reqMethod
    }
    const res = await axios.put(`${process.env.url}/room`, data)
    console.log(res.data)
    if(res.data === "Booking Added Successfully" || res.data === "Member Updated Successfully"){
      handleClose()
      getRooms()
      toast.success("Email Sent Successfully")
    }
    else if(res.data === "Email Failed to send"){
      toast.error("Booking added Successfully but Failed to Send Email")
      handleClose()
      getRooms()
    }
    else if(res.data === "Dates Already Booked"){
      setAlreadyBooked(true)
    }
    setApiRes(false)
  }else{
    setRoomError(true)
  }
}

const handleInputs = (column, room, member) => {
  setSelectedRoom(room)
  setDelButton(true)
  setDialog(true)
  console.log(member)
  setMuiCheckInDate(dayjs(member.checkIn))
  setMuiCheckOutDate(dayjs(member.checkOut))
  setReqMethod("Update Member")
  setInputs((input) => ({
    ...input,roomName: room.roomTitle ,roomId: room._id, memberId: member._id, name: member.name, gender: member.gender, phone: member.phone, country: member.country, email: member.email, checkIn: member.checkIn, checkOut: member.checkOut, payment: member.payment,  status: member.paid == false ? "Unpaid" : "Paid", previousRoom: room._id
  }))
}

const handleDelete = async () => {
  setDeleting(true)
  setApiRes(true)
  const data = {
    reqMethod: "Delete Booking",
    roomId: inputs.roomId,
    memberId: inputs.memberId
  }
  const res = await axios.delete(`${process.env.url}/room`, { data })
  if(res.data === "Booking Deleted Successfully"){
    handleClose()
    getRooms()
    toast.success("Booking Deleted Successfully")
  }
  setApiRes(false)
  handleCloseDelModal()
  setDeleting(false)
}

const handleRoom = (room) => {
  setInputs((input) => ({...input, roomId: room._id, roomName: room.roomTitle}))
  setRoomError(false)
}

const handleRoomChanged = (room) => {
  setInputs((input) => ({...input, roomId: room._id, roomName: room.roomTitle}))
  setRoomError(false)
  setReqMethod("Room Changed")
}

const handleOpenDelModal = () => {
  setOpen(true)
}

const handleCloseDelModal = () => {
  setOpen(false)
}

  return (
     <ThemeProvider theme={theme}>
        <FullLayout>
          <div className="font-main">
            <h1 className="font-bold text-xl text-center">Room Reservations</h1>
            <div className="relative flex items-center justify-center py-5">
              <button className="mx-5 text-green hover:bg-greenHover hover:text-white rounded-full p-1" onClick={handlePrevious}><ArrowBackIosNewIcon/></button>
              <p className="text-xl font-bold">{columns && <div>{date.format("MMMM")} {date.format("YYYY")}</div>}</p>
              <button className="mx-5 text-green hover:bg-greenHover hover:text-white rounded-full p-1" onClick={handleNext}><ArrowForwardIosIcon/></button>
              <button className="absolute bg-green rounded-md px-4 py-2 text-xl font-bold right-10 hover:bg-greenHover" onClick={handleOpen}>Add Booking</button>
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
                                <div className="relative w-full" key={member}>
                                  <ConditionalRendering column={column} member={member} displayColumn={displayColumn} handleInputs={() => handleInputs(column, room, member)} handleOpen={() => handleOpen(column, room)}/>
                                </div>
                                </>
                              )
                            }) : null
                            // <div onClick={() => handleOpen(column, room)} className="h-full w-full flex items-center justify-center">
                            //   <AddCircleIcon className="text-green"/> 
                            // </div>
                          }
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>

          <Dialog open={dialog} onClose={handleClose} scroll="paper" maxWidth="false">
            <div className="w-dialog h-screen">
            <DialogTitle style={{fontSize: "20px" , fontWeight: "600"}}>Booking Menu</DialogTitle>
            <DialogContent className="w-dialog">
            {  
                inputs && apiRes == false ?
                <div className="flex flex-col items-center justify-center">
                <div className="mt-4 relative">
                    { alreadyBooked === true ? <Alert severity="error" className="mt-2 w-full">Dates are already booked</Alert> : null }
                    {selectedRoom != null ? 
                      <div className="flex items-center">
                        <div>
                          <p className="text-xl font-bold">{inputs.roomName}</p>
                          <div className="flex items-center mt-3">
                            <p className="text-xl font-bold">Booking ID : </p>
                            <p className="ml-3 text-xl">{inputs.memberId}</p>
                          </div>
                        </div>
                        <div className="ml-20">
                          <TextField
                          select
                          name={"room"}
                          label="Change Room"
                          className="w-40"
                          >
                          {rooms && rooms.map((room) => (
                            <MenuItem key={room} value={room} onClick={() => handleRoomChanged(room)}>
                              {room.roomTitle}
                            </MenuItem>
                          ))}
                          </TextField>
                        </div>
                      </div>
                       : 
                      <TextField
                      select
                      name={"room"}
                      label="Select Room"
                      className="w-96"
                      >
                      {rooms && rooms.map((room) => (
                        <MenuItem key={room} value={room} onClick={() => handleRoom(room)}>
                          {room.roomTitle}
                        </MenuItem>
                      ))}
                      </TextField>
                    }
                   
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
                    type="number"
                    inputProps={{min: 0}}
                    name="payment"     
                    margin="normal"
                    label="Payment"
                    fullWidth
                    variant="standard"
                    value={inputs.payment}
                    onChange={handleChange}
                    />
                    { inputs.status !== undefined ? <TextField
                    type="text"
                    inputProps={{min: 0}}
                    name="status"     
                    margin="normal"
                    label="Status"
                    fullWidth
                    variant="standard"
                    value={inputs.status}
                    /> : null }
                </div>
                </div> : 
                <div className="h-96 flex items-center justify-center">
                  <CircularProgress/> 
                </div>     
            }
            
            </DialogContent>
            {
              apiRes === false ? 
              <DialogActions className=" border-lightGray border-t">
              { roomError === true ? <Alert severity="error" className="w-full">Please Select Room</Alert> : null }
              <button onClick={handleClose} className="text-xl px-4 py-1 font-medium rounded-md">Cancel</button>
              {delButton === true ? <button onClick={handleOpenDelModal} className="text-xl text-white bg-red-600 px-4 py-1 font-medium hover:bg-red-500 rounded-md">Delete</button> : null }
              <button onClick={handleSave} className="text-xl bg-dashboard px-4 py-1 font-medium hover:bg-green rounded-md">Save</button>
              </DialogActions> : null
            }
            </div>
          </Dialog>
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

          <Modal
          open={open}
          onClose={handleCloseDelModal}
          >
            <Box className="absolute left-1/2 top-1/2 bg-white p-10 py-14 flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 font-main">
              <h1 className="text-xl font-bold">Are you sure you want to delete booking ? This cannot be undone and will permanently delete booking</h1>
              <div className="w-full flex items-center justify-center mt-5"> 
                { deleting === false ? <button className="mx-10 bg-red-500 w-32 h-9 text-lg text-white font-bold" onClick={handleDelete}>Yes</button> 
                : <div className="mx-10 h-9 w-32 flex items-center justify-center ">
                    <CircularProgress/>
                  </div> }
                <button className="mx-10 bg-green w-32 h-9 text-lg font-bold" onClick={handleCloseDelModal}>Cancel</button>
              </div> 
            </Box>
          </Modal>

        </FullLayout>
    </ThemeProvider>
  )
}

export default RemoveCourse