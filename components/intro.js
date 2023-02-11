import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const Intro = () => {

  const {ref: intro, inView: isIntro} = useInView()

  return (
    <div className="sm:h-slider bg-servicesBG flex items-center justify-center " >
        <div className="flex flex-col sm:flex-row h-full w-full sm:w-width mt-10 sm:mt-0">
            <div className=" sm:w-2/5 flex items-center justify-center py-10">
              <div className='relative h-full w-full'>
                <Image src="/images/introPic.jpeg" layout='fill' objectFit='cover'/>
              </div>

            </div>

            <div className=" sm:w-3/5 flex items-center justify-center text-xl text-justify px-10 mt-5 sm:mt-0 " ref={intro}>
              {isIntro && 
              <motion.p
              initial={{opacity: 0, y: 80}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 2}}
              >
                <h1 className="sm:text-2xl text-xl text-center font-medium">INTRODUCTION TO FRIENDS ACADEMY</h1>
                <p className='mt-10'>Established in 2019, Friends Academy Ltd provides high quality mentoring for PLAB2 OSCE exam. We have a diverse team of doctors and healthcare professionals with many years of experience within the UK as fully qualified medical professionals. We come with working experience in different specialties of medicine and our blended experiences of teaching will enable you take an excellent start in the UK. Our aim is to provide overseas doctors an excellent platform for the preparation of OSCE / PLAB2 examination in a very friendly environment coupled with excellent supervision. 
We have implemented more interactive teaching style unlike the conventional methods. We suggest you to join us to sharpen up your interpersonal & consultation skills to enable you to pass your examination in the first attempt.  We shall work with you closely and keep track of your progress and formulate a specific plan on individual basis. Together we shall work on your consultation structure rather than sitting alone and rehearsing scripts.
We follow GMC syllabus and guidance provided on the PLAB Blueprints <a target="_blank" rel="noreferrer" href="https://www.gmc-uk.org/-/media/documents/plab-blueprint_pdf-65021787.pdf">(https://www.gmc-uk.org/-/media/documents/plab-blueprint_pdf-65021787.pdf)</a>.</p>
              </motion.p>
              }
            </div>
        </div>
    </div>
  )
}

export default Intro