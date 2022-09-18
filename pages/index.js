import Head from 'next/head'
import Image from 'next/image'
import Slider from '../components/slider'
import PlabInfo from '../components/plabInfo'
import Services from '../components/services'
import About from '../components/about'
import Contact from '../components/contact'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Friends Academy UK</title>
        <link rel="icon" href="/Friends Academy.png"/>
      </Head>
      <Slider/>
      <PlabInfo/>
      <Services/>
      <About/>
      <Contact/>
    </div>
  )
}
