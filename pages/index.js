import Head from 'next/head'
import Image from 'next/image'
import Slider from '../components/slider'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Friends Academy UK</title>
        <link rel="icon" href="/Friends Academy.png"/>
      </Head>
      <Slider/>
      
    </div>
  )
}
