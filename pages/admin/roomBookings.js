import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { useEffect, useRef, useState } from "react"
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

const RemoveCourse = () => {

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const [ columns, setColumns ] = useState([
    {
      Day: "",
      Date: "",
      Month: "",
      stringMonth: "",
      Year: "",
      completeDate: ""
    }
  ])
  const date = new Date()
  const getDaysInCurrentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const firstDayOfCurrentMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  const [ month, setMonth ] = useState(date.getMonth())
  const [ year, setYear ] = useState(date.getFullYear())
  const prevState = useRef()
  const [ firstRender, setFirstRender ] = useState(false)
  const [ displayColumn, setDisplayColumn ] = useState()
  const [ rooms, setRooms ] = useState()
  const [ dialog, setDialog ] = useState(false)
  const [ inputs, setInputs ] = useState({
    roomId: "",
    name: "",
    gender: "",
    phone: "",
    country: "",
    email: "",
    checkIn: {
      date: null,
      month: null,
      year: null
    },
    checkOut: {
      date: null,
      month: null,
      year: null
    },
    bed: "",
    payment: ""
  })
  const [ apiRes, setApiRes ] = useState(false)
  const [ muiCheckInDate, setMuiCheckInDate ] = useState(dayjs(date))
  const [ muiCheckOutDate, setMuiCheckOutDate ] = useState(null)
  const [ selectedRoom, setSelectedRoom ] = useState()

  const handleChange = (e) => {
    const {name, value} = e.target
    setInputs((prev) => ({
        ...prev, [name]:value
    }))
  }

  const handleCheckInDate = () => {
    console.log(muiCheckInDate)
    setInputs((current) => {
      return{
        ...current, checkIn: {
          date: muiCheckInDate.$D,
          month: muiCheckInDate.$M,
          year: muiCheckInDate.$y
        }
      }
    })
  }
  
  const handleCheckOutDate = () => {
    muiCheckOutDate && setInputs((current) => {
      return{
        ...current, checkOut: {
          date: muiCheckOutDate.$D,
          month: muiCheckOutDate.$M,
          year: muiCheckOutDate.$y
        }
      }
    })
  }

  let arr = []
  let monthInString

  const getRooms = async () => {
    const rooms = await axios.get(`${process.env.url}/room`)
    setRooms(rooms.data)
  }

  const setDate = (totalDays, firstDay, currentMonth, year) => {
    
    for(let i = 0; i <= months.length; i++){
      if(currentMonth == i){
        monthInString = months[i]
      }
    }

    for(let i = 0; i < totalDays; i++){
      if(firstDay == 7){
        firstDay = 0
        arr.push({Day: weekday[firstDay], Date: i+1, Month: currentMonth, stringMonth: monthInString, Year: year, completeDate: new Date(`${year}-${currentMonth + 1}-${i+1}`)})
        firstDay++
      }else{
        arr.push({Day: weekday[firstDay], Date: i+1, Month: currentMonth, stringMonth: monthInString, Year: year, completeDate: new Date(`${year}-${currentMonth + 1}-${i+1}`)})
        firstDay++
      }
    }
    setColumns(arr)

    if(firstRender == false){
      setFirstRender(true)
      prevState.current = month
    }
  }

  useEffect(() => {
    setDisplayColumn(columns.slice(0, columns.length / 2))
  }, [columns])

  useEffect(() => {
    setDate(getDaysInCurrentMonth, firstDayOfCurrentMonth, month, year)
    getRooms()
  }, [])  
  
  const getNextYearMonth = () => {
    console.log("getNextYearMonth")
    const daysInNextMonth = new Date(year, 1, 0).getDate()
    const firstDayOfNextMonth = new Date(year, month, 1).getDay()
    setDate(daysInNextMonth, firstDayOfNextMonth, month, year)
    prevState.current = month
  }
    
  const getNextMonth = () => {
      console.log("getNextMonth")
      const daysInNextMonth = new Date(year, month + 1, 0).getDate()
      const firstDayOfNextMonth = new Date(year, month, 1).getDay()
      setDate(daysInNextMonth, firstDayOfNextMonth, month, year)
      prevState.current = month
  }

  const getPreviousYearMonth = () => {
    console.log("getPreviousYearMonth")
    const daysInPreviousMonth = new Date(year, 0, 0).getDate()
    const firstDayOfPreviousMonth = new Date(year, month, 1).getDay()
    setDate(daysInPreviousMonth, firstDayOfPreviousMonth, month, year)
    prevState.current = month
  }

  const getPreviousMonth = () => {
      console.log("getPreviousMonth")
      const daysInPreviousMonth = new Date(year, month + 1, 0).getDate()
      const firstDayOfPreviousMonth = new Date(year, month, 1).getDay()
      setDate(daysInPreviousMonth, firstDayOfPreviousMonth, month, year)
      prevState.current = month
  }
  
  const handleNext = () => {
    if(displayColumn[0].Date == 1){
      setDisplayColumn(columns.slice(columns.length / 2))
    }else{
      if(month == 11){
        setMonth(0)
        setYear((prev) => prev + 1)
      }else{
        setMonth((prev) => prev + 1)
      }
    }
  } 

  const handlePrevious = () => {
    if(displayColumn[0].Date != 1){
      setDisplayColumn(columns.slice(0, columns.length / 2))
    }else{
      if(month == 0){
        setMonth(11)
        setYear((prev) => prev - 1)
      }else{
        setMonth((prev) => prev - 1)
      }
    } 
  }

  useEffect(() => {
    if(firstRender != false){
      getNextYearMonth()
    }
  }, [month == 0 && prevState.current == 11])

  useEffect(() => {
    if(firstRender != false){
      getPreviousYearMonth()
    }
  }, [month == 11 && prevState.current == 0])

  useEffect(() => {
    if(firstRender != false){
      if(month > prevState.current){
        getNextMonth()
      }else if(month < prevState.current){
        console.log(prevState.current, month)
        getPreviousMonth()
      }
    }
  }, [month]) 

  const ConditionalRendering = (props) => {

    const column = props.column
    const member = props.member
    console.log(column)
    console.log(member)

    if(member.checkIn && member.checkOut){
      if(member.checkIn.month <= member.checkOut.month && member.checkIn.year === member.checkOut.year && member.checkIn.month <= column.Month && member.checkOut.month >= column.Month){
        if(member.checkIn.month === column.Month){
          if(member.checkIn.date <= column.Date){
            
            let half
            let center

            if(member.checkIn.date <= 15 && displayColumn[0].Date === 1){
              half = displayColumn.length - member.checkIn.date

              for(let i = 0; i<=half/2; i++){
                center = i
              }

              center = member.checkIn.date + center

              console.log(center)
              if(column.Date === center){
                return(
                  <div className="bg-green absolute top-firstRow flex items-center justify-center w-20 h-16">
                    <a className="absolute w-40 font-bold text-xl text-center z-10 ">{member.name}</a>
                  </div>
                )
              }else{
                return(
                  <div className="bg-green absolute top-firstRow flex items-center justify-center w-20 h-16"></div>
                )
              }    
            }
            else{
              center = 23
              if(column.Date === center){
                return(
                  <div className="bg-green absolute top-firstRow flex items-center justify-center w-20 h-16">
                    <a className="absolute w-40 font-bold text-xl text-center z-10 ">{member.name}</a>
                  </div>
                )
              }else{
                return(
                  <div className="bg-green absolute top-firstRow flex items-center justify-center w-20 h-16"></div>
                )
              } 
            }     
          }
        }
        else if(member.checkIn.month < column.Month && member.checkOut.month > column.Month){
          if(column.Date === 8 || column.Date === 23){
            return(
              <div className="bg-green absolute top-firstRow flex items-center justify-center w-20 h-16">
                <a className="absolute w-40 font-bold text-xl text-center z-10 ">{member.name}</a>
              </div>
            )
          }else{
            return(
              <div className="bg-green absolute top-firstRow flex items-center justify-center w-20 h-16"></div>
            )
          }
        }else if(column.Month === member.checkOut.month){
          if(column.Date <= member.checkOut.date){
            let half
            let center

            if(member.checkOut.date >= 15 && displayColumn[0].Date === 1){
              center = 8
              if(column.Date === center){
                return(
                  <div className="bg-green absolute top-firstRow flex items-center justify-center w-20 h-16">
                    <a className="absolute w-40 font-bold text-xl text-center z-10 ">{member.name}</a>
                  </div>
                )
              }else{
                return(
                  <div className="bg-green absolute top-firstRow flex items-center justify-center w-20 h-16"></div>
                )
              }
            }
            else{
              half = member.checkOut.date - displayColumn[0].Date
              console.log(half)

              for(let i = 0; i <= half/2; i++){
                center = i
              }
              console.log(center)

              center = member.checkOut.date - center
              console.log(center)

              if(column.Date === center){
                return(
                  <div className="bg-green absolute top-firstRow flex items-center justify-center w-20 h-16">
                    <a className="absolute w-40 font-bold text-xl text-center z-10 ">{member.name}</a>
                  </div>
                )
              }else{
                return(
                  <div className="bg-green absolute top-firstRow flex items-center justify-center w-20 h-16"></div>
                )
              }    
            }
          }
        }
      }
    } 
  }

  const handleClose = () => {
    console.log("asdkjhaskljdklas")
    setDialog(false)
  }

  const handleOpen = (column, room) => {
    setDialog(true)
    setSelectedRoom(room)
    setMuiCheckInDate(dayjs(new Date(column.completeDate)))
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
    inputs: inputs
  }
  const res = await axios.put(`${process.env.url}/room`, data)
}

console.log(rooms)

  return (
     <ThemeProvider theme={theme}>
        <FullLayout>
          <div className="font-main">
            <h1 className="font-bold text-xl text-center">Room Reservations</h1>
            <div className="flex items-center justify-center py-5">
              <button className="mx-5 text-green hover:bg-greenHover hover:text-white rounded-full p-1" onClick={handlePrevious}><ArrowBackIosNewIcon/></button>
              <p className="text-xl font-bold">{columns && <div>{columns[0].Date} {columns[0].stringMonth}, {columns[0].Year}</div>}</p>
              <button className="mx-5 text-green hover:bg-greenHover hover:text-white rounded-full p-1" onClick={handleNext}><ArrowForwardIosIcon/></button>
            </div>
            <div className="flex border-y border-gray">
              <div className="flex items-center w-44 break-words justify-center border-r border-gray">
                <p className="text-xl">Rooms</p>
              </div>
              {displayColumn && displayColumn.map((column) => {
                return(
                  <div className="flex flex-col items-center justify-center py-2 w-20 border border-black" key={column}>
                    <p>{column.Day}</p>
                    <p>{column.Date}</p>
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
                        <div className="flex flex-col items-center h-20 justify-center w-20 border border-black cursor-pointer hover:bg-lightGray" onClick={() => handleOpen(column, room)} key={column}>
                          {
                            room.roomMembers.length != 0 ? room.roomMembers.map((member) => {
                              return(
                                <div className="flex w-full" key={member}>
                                  <ConditionalRendering column={column} member={member}/>
                                </div>
                              )
                            }) : 
                            <div>
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
                    defaultValue={inputs.roomTitle}
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
            <button onClick={handleSave} className="text-xl bg-dashboard px-4 py-1 font-medium hover:bg-green rounded-md">Save</button>
            </DialogActions>
          </Dialog>
        </FullLayout>
    </ThemeProvider>
  )
}

export default RemoveCourse