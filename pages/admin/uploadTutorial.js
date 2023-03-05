import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import axios from "axios";
import { useState, useEffect } from "react";
import { Player, ControlBar, PlaybackRateMenuButton } from 'video-react';
import "video-react/dist/video-react.css"
import Alert from '@mui/material/Alert';
import Image from "next/image";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress'
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

const VideoUpload = () => {

  const [ file, setFile ] = useState()
  const [ fileContent, setFileContent ] = useState()
  const [ progress, setProgress ] = useState(0)
  const [ uploading, setUploading ] = useState(false)
  const [ error, setError ] = useState(false)
  const [ files, setFiles ] = useState()
  const [ open, setOpen ] = useState(false);
  const [ selectedFile, setSelectedFile ] = useState()
  const [ loadingDelete, setLoadingDelete ] = useState(false)
  const [ edit, setEdit ] = useState(false)
  const [ input, setInput ] = useState()
  const [ loadingEdit, setLoadingEdit ] = useState(false)

  const handleOpen = (file) => {
    setSelectedFile(file)
    setOpen(true)
  };

  const handleClose = () => {
    setSelectedFile(null)
    setOpen(false)
  };

  const handleFile = (e) => {
    setError(false)
    setFile(e.target.files[0])

    if(e.target.files.length !== 0){
      const reader = new FileReader();
      reader.onload = function(e) {
        setFileContent(reader.result)
      };
      
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const getAllFiles = async () => {
    const res = await axios.get(`${process.env.url}/files`)
    setFiles(res.data)
  }

  const handleUpload = async () => {

    if(file == null){
      setError(true)
    }else{
      
      setUploading(true)
      
      let uploadId
      if(localStorage.uploadId){
        uploadId = localStorage.uploadId
        console.log(uploadId)
      }else{
        let uploadIdData = {
          fileName: file.name,
          contentType: file.type,
          reqMethod: "UploadId"
        }
        const res = await axios.post(`${process.env.url}/uploadVideo`, uploadIdData)
        uploadId = res.data.UploadId
        localStorage.setItem("uploadId", uploadId)
        console.log(uploadId)
      }
      console.log(localStorage.getItem("uploadId"))
      const partSize = 10 * 1024 * 1024
      const totalParts = Math.floor(file.size / partSize) + 1
  
      let uploadedParts = []
  
      for(let i = 1; i <= totalParts; i++){
        const start = ( i - 1 ) * partSize
        const end = i * partSize
        const trimmedFile = file.slice(start, end)
  
        let urlData = {
          fileName: file.name,
          partNumber: i,
          uploadId,
          reqMethod: "getUrl"
        }
        const signedURL = await axios.post(`${process.env.url}/uploadVideo`, urlData)
        console.log(signedURL.data)
        
        const uploadPart = await axios.put(signedURL.data, trimmedFile)
        console.log(uploadPart.data)
  
        console.log(uploadPart)
        const ETag = uploadPart.headers.etag
  
        const uploadPartData = {
          ETag,
          PartNumber: i
        }
        console.log(uploadPartData)
  
        uploadedParts.push(uploadPartData)
        
        let percentage = ( i / totalParts ) * 100
        setProgress(percentage)
      }
  
      let completedData = {
        fileName: file.name,
        parts: uploadedParts,
        uploadId,
        reqMethod: "complete"
      }
      const uploadComplete = await axios.post(`${process.env.url}/uploadVideo`, completedData)
      console.log(uploadComplete)
  
      let abortData = {
        reqMethod: "abort",
        uploadId,
        fileName: file.name
      }
      const abortMultipart = await axios.post(`${process.env.url}/uploadVideo`, abortData)
      console.log(abortMultipart)
      
      localStorage.removeItem("uploadId")
      setUploading(false)
      getAllFiles()
    }
    
  }

  const handleIds = async () => {
    const res = await axios.get(`${process.env.url}/uploadVideo`)
    console.log(res.data)
  }

  useEffect(() => {
    if(localStorage.getItem("uploadId")){
      console.log(localStorage.getItem("uploadId"))
    }
    getAllFiles()
  }, [])

  const handleDelete = async () => {
    setLoadingDelete(true)
    const deleteFile = await axios.delete(`${process.env.url}/files`, { data: { file: selectedFile}})
    if(deleteFile.data === "File Deleted Successfully"){
      handleClose()
      getAllFiles()
      setLoadingDelete(false)
    }
  }

  const handleEdit = (name) => {
    setEdit(true)
    setInput(name)
  }

  console.log(input)

  const handleSave = async (file) => {
    if(input != ""){
      setLoadingEdit(true)
      const data = {
        file,
        input
      }
      const editName = await axios.put(`${process.env.url}/files`, data)
      if(editName.data === "Name Changed Successfully"){
        getAllFiles()
        setLoadingEdit(false)
        setEdit(false)
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
        <FullLayout>
          <div className="font-main">
            <div className="flex items-center justify-center flex-col">
              <div className="border-2 flex items-center justify-center rounded-full pr-3">
                <label for="tutorial" className="bg-green px-10 py-2 text-lg font-bold rounded-l-full cursor-pointer">Choose File</label>
                <label className="ml-2 w-96">{file && file.name}</label>
                <input id="tutorial" className="hidden" onChange={(e) => handleFile(e)} type="file"/>
              </div>
              { uploading == false ? <button className="mt-5 bg-green px-10 py-2 text-lg rounded-full font-bold" onClick={handleUpload}>Upload</button> : 
                <button className="mt-5 bg-green px-10 py-2 text-lg rounded-full font-bold">Uploading</button> }
              { uploading === true ? 
              <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-10">
                <div className="bg-green text-lg font-medium text-black text-center p-0.5 leading-none rounded-full" style={{width: `${progress}%`}}>{progress}%</div>
              </div> : null
              }
              { error === true ?  <Alert severity="error" className="w-2/4 mt-3">Please Add File</Alert> : null }
            </div>
              
            { files && files.length != 0 ? 
            files.map((item) => {
              if(item.type === "png" || item.type === "jpg" || item.type === "jpeg"){
                return(
                  <div className="border-2 border-pink rounded-lg flex-col px-10 py-5 mt-5 flex items-center">
                    <div className="relative h-72 w-testimonials">
                      <Image src={item.location} layout="fill" objectFit="contain"/>
                    </div>
                    {
                      loadingEdit === false ? 
                      <div className="mt-5 flex items-center justify-center ">
                      { edit == true ? 
                      <div>
                        <input value={input} className="outline-none px-5 w-80 py-2 border-2 border-green rounded-lg" onChange={(e) => setInput(e.target.value)}/> 
                        <button className="w-20 py-2 text-lg font-bold bg-green ml-5 rounded-lg" onClick={() => handleSave(item)}>Save</button>
                      </div>
                      : <h1 className="text-xl font-bold">{item.name}</h1> }
                      <div className="text-gray cursor-pointer ml-5">
                       { edit == false ? <EditIcon onClick={() => handleEdit(item.name)}/> : <CloseIcon onClick={() => setEdit(false)}/> }
                      </div>
                    </div> : 
                    <div className="mt-5 flex items-center justify-center ">
                      <CircularProgress/>
                    </div>     
                    }
                    
                    <div className="w-full flex justify-end">
                      <button className="bg-red-500 w-32 py-2 text-lg font-bold text-white rounded-lg" onClick={() => handleOpen(item)}>Delete</button>
                    </div>
                  </div>
                )
              }else{
                return(
                  <div className="w-full flex flex-col items-center mt-5 justify-center py-5 border-2 border-pink rounded-lg px-10">
                    <Player
                      fluid={false}
                      height={500}
                      playsInline
                      playbackRate
                      // poster="/assets/poster.png"
                      src={item.tutorialLocation}
                    >
                      <ControlBar>
                        <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} />
                      </ControlBar> 
                    </Player>
                    <h1 className=" mt-5 text-xl font-bold">{item.tutorialName}</h1>
                  </div>
                )               
              }          
            })
             : null }
            
            {/* <button onClick={handleIds}>Delete Multpart Ids</button> */}
            
            <Modal
            open={open}
            onClose={handleClose}
            >
              <Box className="absolute left-1/2 top-1/2 bg-white p-10 py-14 flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 font-main">
                <h1 className="text-xl font-bold">Are you sure you want to delete ? This will permanently delete the file</h1>
                <div className="w-full flex items-center justify-center mt-5"> 
                  { loadingDelete === false ? <button className="mx-10 bg-red-500 w-32 h-9 text-lg text-white font-bold" onClick={handleDelete}>Yes</button> 
                  : <div className="mx-10 h-9 w-32 flex items-center justify-center ">
                      <CircularProgress/>
                    </div> }
                  <button className="mx-10 bg-green w-32 h-9 text-lg font-bold" onClick={handleClose}>Cancel</button>
                </div> 
              </Box>
            </Modal>

            
            
          </div>    
        </FullLayout>
    </ThemeProvider>
  )
}
  
  export default VideoUpload