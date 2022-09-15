import { useInView } from 'react-intersection-observer';
import { motion } from "framer-motion"

const PlabInfo = () => {

    const {ref: header, inView: isHeader} = useInView({triggerOnce: true})
    const {ref: p1, inView: isP1} = useInView({triggerOnce: true})
    const {ref: p2, inView: isP2} = useInView({triggerOnce: true})
    const {ref: p3, inView: isP3} = useInView({triggerOnce: true})

  return (
    <div className="font-main flex flex-col items-center p-5 overflow-x-hidden text-justify">
        <div ref={header}>
            <motion.div 
                initial={{opacity: 0, scale: 0}}
                animate={isHeader && {opacity: 1, scale: 1}}
                transition={{duration: 0.5}}
            >
                <h1 className="mt-10 text-4xl font-bold">What is PLAB ?</h1>
                <div className="w-56 mt-2 flex items-center justify-center">
                    <div className="border-b-2 w-28 border-green"></div>
                    <div className="h-2 w-2 rounded-half bg-pink mx-3"></div>
                    <div className="border-b-2 w-28 border-green"></div>
                </div>
            </motion.div>
        </div> 
        
        <div ref={p1} className="mt-10">
            <motion.p             
                initial={{x: "-100%"}}
                animate={isP1 && {x: "0%"}}
                transition={{duration: 1}}
                className="text-xl mx-10">IELTS / OET are the first step towards the PLAB and it is not an easy task to go through. Our help and guidance will make this journey possible without loosing too much money and facing an excessive amount of stress. Our team will provide one-on-one guidance and help so that you can move quickly towards your final destination. If you have plans to do PLAB and struggling to find the right information please be in touch with us so that we could help you. You can visit the GMC website for detailed information, the link of which is here <a className="font-bold" href="https://www.gmc-uk.org/registration-and-licensing/join-the-register/plab/a-guide-to-the-plab-test.">https://www.gmc-uk.org/registration-and-licensing/join-the-register/plab/a-guide-to-the-plab-test.</a>
            </motion.p>
        </div>       
        <div ref={p2} className="mt-10">
            <motion.p
                initial={{x: "100%"}}
                animate={isP2 && {x: "0%"}}
                transition={{duration: 1}}
                className="text-xl mx-10">PLAB 1 tests your clinical knowledge in various areas of medicine, our dedicated team is here to provide you guidance on what to read and what not to. Time management and staying on the right point are the keys to success and reading like a primary school child may give you extensive bookish knowledge but not necessarily what you need to know for passing this difficult exam with excellent grades. UK being pioneer of the medicine tests your knowledge based on the actual clinical scenarios and lacking the information on what is important here to be a successful part of the medical team may lead you to the failure. We believe that our timely guidance and help can make you a competent and successful candidate to step forwards to the next exam which is OSCE. Our team would be very happy in guiding you to the right path of success. If you have passed IELTS / OET please do not hesitate to contact us to get advice on the helping material for PLAB 1 preparation. There is no fee for our help in PLAB 1 guidance and you will be able to discuss anything in relation to PLAB-1 and PLAB-2 over the phone. We will guide you on how to prepare your visa application once you pass your PLAB-1. If you are looking for a true help, please contact us now.
            </motion.p>
        </div>
        <div ref={p3} className="mt-10">            
            <motion.div
            initial={{x: "-100%"}}
            animate={isP3 && {x: "0%"}}
            transition={{duration: 1}}
            className="text-xl mx-10">PLAB2 is and OSCE examination held by the GMC nearly thoughout the year (dates are available on GMC website). It is very important to know what you should be expecting in your examination. It covers various aspects of medical practices which not only involves management of the clinical issues of the patients but also managing the non clinical aspects of a patient's life. PLAB2 tests you at the FY2 level of what is expected from a doctor and knowing this knowledge is extremely important especially when you are coming from a different medical / health system. Here we provide excellent coaching on the OSCE examination to enhance your chances of success. We do not teach you acting unlike many other academies which makes you scripted when you go for your examination. We follow GMC syllabus and guidance provided on the PLAB Blueprints <a className="font-bold" href="https://www.gmc-uk.org/-/media/documents/plab-blueprint_pdf-65021787.pdf">(https://www.gmc-uk.org/-/media/documents/plab-blueprint_pdf-65021787.pdf)</a>. We suggest you to join us to excell your built-in abilities and bring your confidence to that front and enable you pass your examination in the first attempt.
            </motion.div>         
        </div>
       
    </div>
  )
}

export default PlabInfo