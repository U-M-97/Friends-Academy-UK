import Header from "./header"
import Navbar from "./navbar"

export default function Layout({children}){
  return (
    <>
      <Header/>
      <Navbar/>
      {children}
    </>
  )
}
