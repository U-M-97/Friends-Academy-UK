const Room = require("../../models/room")
const dbConnect = require("../../utils/connectDB")
const verifyToken = require("./verifyToken")

export default async function handler (req, res) {
   
    await dbConnect()
    const tokenCheck = await verifyToken(req)
    
    if(tokenCheck === "Token is not Present"){
        return res.send("Token is not Present")
    }

    if(tokenCheck === "Token is not Valid"){
        return res.send("Token is not Valid")
    }

    if(tokenCheck === "Allowed"){
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
        }else if(req.method === "PUT"){
            try{
                const {memberId, name, gender, phone, country, email, checkIn, checkOut, bed, payment } = req.body.inputs
                const id = req.body.id
                const reqMethod = req.body.reqMethod
                console.log(reqMethod)
                
                if(reqMethod === "Add Member"){
                    const updateRoom = await Room.findByIdAndUpdate(id, {
                        $push: {
                            roomMembers: {
                                name: name,
                                gender: gender,
                                phone: phone,
                                country: country,
                                email: email,
                                checkIn: checkIn,
                                checkOut: checkOut,
                                bed: bed,
                                payment: payment
                            }
                        }
                    })
                    console.log(updateRoom)
                    res.send("Booking Added Successfully")
                } 

                else if(reqMethod === "Update Member"){
                    console.log(memberId)
                    const updateData = {
                        name: name,
                        gender: gender,
                        phone: phone,
                        country: country,
                        email: email,
                        checkIn: checkIn,
                        checkOut: checkOut,
                        bed: bed,
                        payment: payment
                    }
                    const updateRoomMember = await Room.findOneAndUpdate({$and: [{_id: id}, {'roomMembers._id' : memberId}]}, {
                        $set: {
                            'roomMembers.$': updateData
                        } 
                    })
                    res.send("Member Updated Successfully")
                }
            }catch(err){
                res.send(err)
            }
        }
    }    
}