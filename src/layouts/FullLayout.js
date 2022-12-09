import React from "react";
import {
  experimentalStyled,
  useMediaQuery,
  Container,
  Box,
} from "@mui/material";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./footer/Footer";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next"
import axios from "axios";
import { useState, useEffect } from "react"

const MainWrapper = experimentalStyled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
}));

const PageWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",

  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up("lg")]: {
    paddingTop: "64px",
  },
  [theme.breakpoints.down("lg")]: {
    paddingTop: "64px",
  },
}));

const FullLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const [ isCookie , setIsCookie ] = useState(false)

  const admin = useSelector((state) => state.admin.admin)
  console.log(admin)
  const router = useRouter()
  const cookieExist = getCookie("token");
  console.log(cookieExist)

  const checkCookie = async () => {
    const res = await axios.get(`${process.env.url}/adminAuth`, { params: {cookieExist} } )
    console.log(res.data)
    if(res.data !== "Cookie not exists"){
      setIsCookie(true)
    }else{
      router.push("/admin/adminLogin")
    }
  }

  if(cookieExist){
    checkCookie()
  }else{
    router.push("/admin/adminLogin")
  }
  
  if(isCookie === true){
    return (
      <MainWrapper>
        <Header
          sx={{
            paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
            backgroundColor: "#fbfbfb",
          }}
          toggleMobileSidebar={() => setMobileSidebarOpen(true)}
        />
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
        <PageWrapper>
          <Container
            maxWidth={false}
            sx={{
              paddingTop: "20px",
              paddingLeft: isSidebarOpen && lgUp ? "280px!important" : "",
            }}
          >
            <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
            {/* <Footer /> */}
          </Container>
        </PageWrapper>
      </MainWrapper>
    );
  }
  
};

export default FullLayout;
