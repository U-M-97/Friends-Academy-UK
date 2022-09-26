import Head from 'next/head'
import Image from 'next/image'
import Slider from '../components/slider'
import PlabInfo from '../components/plabInfo'
import Services from '../components/services'
import About from '../components/about'
import Contact from '../components/contact'
import Events from '../components/events'
import Accommodation from '../components/accomodation'
import Testimonials from '../components/testimonials'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Friends Academy UK</title>
        <link rel="icon" href="/images/Friends Academy.png"/>
      </Head>
      <Slider/>
      <PlabInfo/>
      <Services/>
      <About/>
      <Testimonials/>
      <Events/>
      <Accommodation/>
      <Contact/>
    </div>
  )
}
