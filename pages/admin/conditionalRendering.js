import AddCircleIcon from '@mui/icons-material/AddCircle';
import dayjs from 'dayjs';

const ConditionalRendering = (props) => {

    const column = props.column
    const member = props.member
    const displayColumn = props.displayColumn
    
    if(column.isSame(dayjs(member.checkIn, "DD/MM/YYYY"))){
      return(
        <div className="bg-green top-firstRow flex items-center justify-center w-full h-16 z-10" onClick={props.handleInputs}></div>
      )
    } 
    
    else if(column.isAfter(dayjs(member.checkIn, "DD/MM/YYYY")) && column.isBefore(dayjs(member.checkOut, "DD/MM/YYYY"))){
      const checkIn = dayjs(member.checkIn, "DD/MM/YYYY")
      const checkOut = dayjs(member.checkOut, "DD/MM/YYYY")
      const same = checkIn.isSame(checkOut, "month")
      if(same){
        
        const half = (checkIn.date() + checkOut.date()) / 2
        half = Math.round(half)
        if(column.date() === half){
          return(
            <div className="bg-green top-firstRow flex items-center justify-center w-full h-16 z-20" onClick={props.handleInputs}>
              <a className="absolute w-40 font-bold text-xl text-center z-10 ">{member.name}</a>
            </div>
          )
        }else{
          return(
            <div className="bg-green top-firstRow flex items-center justify-center w-full h-16 z-10" onClick={props.handleInputs}></div>
          )
        }
      }

      else if(column.isSame(checkIn, "month")){
        if(checkIn.date() < 15){
          if(displayColumn[0].date() === 1){
            const half = (checkIn.date() + displayColumn.length) / 2
            if(column.date() === half){
              return(
                <div className="bg-green top-firstRow flex items-center justify-center w-full h-16 z-20" onClick={props.handleInputs}>
                  <a className="absolute w-40 font-bold text-xl text-center z-10 ">{member.name}</a>
                </div>
              )
            }else{
              return(
                <div className="bg-green top-firstRow flex items-center justify-center w-full h-16 z-10" onClick={props.handleInputs}></div>
              )
            }
          }else{
            const half = (displayColumn[0].date() + displayColumn[displayColumn.length - 1].date()) / 2
            half = Math.round(half)
            if(column.date() === half){
              return(
                <div className="bg-green top-firstRow flex items-center justify-center w-full h-16 z-20" onClick={props.handleInputs}>
                  <a className="absolute w-40 font-bold text-xl text-center z-10 ">{member.name}</a>
                </div>
              )
            }else{
              return(
                <div className="bg-green top-firstRow flex items-center justify-center w-full h-16 z-10" onClick={props.handleInputs}></div>
              )
            }
          }
        }

        else{
          const half = (checkIn.date() + displayColumn.length) / 2
          if(column.date() === half){
            return(
              <div className="bg-green top-firstRow flex items-center justify-center w-full h-16 z-20" onClick={props.handleInputs}>
                <a className="absolute w-40 font-bold text-xl text-center z-10 ">{member.name}</a>
              </div>
            )
          }else{
            return(
              <div className="bg-green top-firstRow flex items-center justify-center w-full h-16 z-10" onClick={props.handleInputs}></div>
            )
          }
        }
      }

      else if(column.isSame(checkOut, "month")){
        if(checkOut.date() > 15){
          if(displayColumn[0].date() === 1){
            const half = (displayColumn[0].date() + displayColumn[displayColumn.length - 1].date()) / 2
            half = Math.round(half)
            if(column.date() === half){
              return(
                <div className="bg-green top-firstRow flex items-center justify-center w-full h-16 z-20" onClick={props.handleInputs}>
                  <a className="absolute w-40 font-bold text-xl text-center z-10 ">{member.name}</a>
                </div>
              )
            }else{
              return(
                <div className="bg-green top-firstRow flex items-center justify-center w-full h-16 z-10" onClick={props.handleInputs}></div>
              )
            }
          }
          else{
            const half = (displayColumn[0].date() + checkOut.date()) / 2
            half = Math.round(half)
            if(column.date() === half){
              return(
                <div className="bg-green top-firstRow flex items-center justify-center w-full h-16 z-20" onClick={props.handleInputs}>
                  <a className="absolute w-40 font-bold text-xl text-center z-10 ">{member.name}</a>
                </div>
              )
            }else{
              return(
                <div className="bg-green top-firstRow flex items-center justify-center w-full h-16 z-10" onClick={props.handleInputs}></div>
              )
            }
          }
        }
        else{
          const half = (displayColumn[0].date() + checkOut.date()) / 2
          half = Math.round(half)
          if(column.date() === half){
            return(
              <div className="bg-green top-firstRow flex items-center justify-center w-full h-16 z-20" onClick={props.handleInputs}>
                <a className="absolute w-40 font-bold text-xl text-center z-10 ">{member.name}</a>
              </div>
            )
          }else{
            return(
              <div className="bg-green top-firstRow flex items-center justify-center w-full h-16 z-10" onClick={props.handleInputs}></div>
            )
          }
        }
      }

      else{
        const half = (displayColumn[0].date() + displayColumn[displayColumn.length - 1].date()) / 2
        half = Math.round(half)
        if(column.date() === half){
          return(
            <div className="bg-green top-firstRow flex items-center justify-center w-full h-16 z-20" onClick={props.handleInputs}>
              <a className="absolute w-40 font-bold text-xl text-center z-10 ">{member.name}</a>
            </div>
          )
        }else{
          return(
            <div className="bg-green top-firstRow flex items-center justify-center w-full h-16 z-10" onClick={props.handleInputs}></div>
          )
        }
      }
    } 

    else if(column.isSame(dayjs(member.checkOut, "DD/MM/YYYY"))){
      return(
        <div className="bg-green top-firstRow flex items-center justify-center w-full h-16 z-10" onClick={props.handleInputs}></div>
      )
    }

    else{
      return(
        <div className="absolute top-firstRow flex items-center justify-center  w-roomAddIconWidth h-16" onClick={props.handleOpen}>
          <AddCircleIcon className="text-green"/> 
        </div>
      )
    }
  }

  export default ConditionalRendering