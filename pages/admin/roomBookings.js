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

  const handleChange = (e) => {
    const {name, value} = e.target
    setInputs((prev) => ({
        ...prev, [name]:value
    }))
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
        arr.push({Day: weekday[firstDay], Date: i+1, Month: currentMonth, stringMonth: monthInString, Year: year})
        firstDay++
      }else{
        arr.push({Day: weekday[firstDay], Date: i+1, Month: currentMonth, stringMonth: monthInString, Year: year})
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

    if(member.checkIn.month === member.checkOut.month && member.checkIn.month === column.Month){
      if(member.checkIn.date <= column.Date && member.checkOut.date >= column.Date){
        if(column.Date === 23 || column.Date === 8){
          return(
            <div className="relative bg-green w-full">
              <div className="flex items-center justify-center w-full"></div> 
              <a className="absolute w-40 top-6 font-bold text-xl">{member.name}</a>
            </div>
          )
        }else{
          return(
            <div className="bg-green flex items-center justify-center w-full"></div>
          )
        }
      }
    }
  }

  const handleClose = () => {
    console.log("asdkjhaskljdklas")
    setDialog(false)
  }

  const handleOpen = (date) => {
    setDialog(true)
}

const handleSave = () => {

}

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
                  <div className="flex flex-col items-center justify-center py-2 w-20 border border-black">
                    <p>{column.Day}</p>
                    <p>{column.Date}</p>
                  </div>
                )
              })}
            </div>
            <div>
              {rooms && rooms.map((room) => {
                return(
                  <div className="flex border-b border-gray">
                    <div className="flex items-center justify-center border-r border-gray w-44 break-words">
                      <p className="text-xl">{room.roomTitle}</p>
                    </div>
                    {displayColumn && displayColumn.map((column) => {
                      return(
                        <div className="flex flex-col items-center h-20 justify-center w-20 border border-black cursor-pointer hover:bg-lightGray" onClick={handleOpen}>
                          {
                            room.roomMembers.length != 0 ? room.roomMembers.map((member) => {
                              return(
                                <div className="flex w-full">
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
                    defaultValue={inputs.roomType}
                    onChange={handleChange}
                    />
                    <TextField
                    name="phone"     
                    margin="normal"
                    label="Phone"
                    fullWidth
                    variant="standard"
                    defaultValue={inputs.roomType}
                    onChange={handleChange}
                    />
                     <TextField
                    name="country"     
                    margin="normal"
                    label="Country"
                    fullWidth
                    variant="standard"
                    defaultValue={inputs.roomType}
                    onChange={handleChange}
                    />
                     <TextField
                    name="email"     
                    margin="normal"
                    label="Email"
                    fullWidth
                    variant="standard"
                    defaultValue={inputs.roomType}
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