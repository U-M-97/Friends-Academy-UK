const Room = require("../../models/room")
const dbConnect = require("../../utils/connectDB")

export default async function handler (req, res) {
   
    await dbConnect()

    if(req.method === "POST"){
        try{
            const { id, roomImage, roomTitle, roomType, roomBeds } = req.body
            console.log(roomBeds)
            const findRoom = await Room.findByIdAndUpdate(id,{
                image: roomImage,
                roomTitle: roomTitle,
                roomType : roomType,
                roomBeds: roomBeds
            })

            if(findRoom === null){
                const newRoom = await new Room({
                    image: roomImage,
                    roomTitle: roomTitle,
                    roomType : roomType,
                    roomBeds: roomBeds
                })
                newRoom.save()
                res.send(newRoom)
            }else{
                res.send(findRoom)
            }  
        }catch(err){
        res.send(err)
        }  
    }
    else if(req.method === "GET"){
        const rooms = await Room.find()
        res.send(rooms)
    }else if (req.method === "DELETE"){
        const id = req.body
        console.log(id)
        const deletedRoom = await Room.findByIdAndDelete(id)
        if(deletedRoom){
            res.send("Room Deleted Successfully")
        }
    }
}