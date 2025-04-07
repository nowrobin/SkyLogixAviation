'use client'

import ContactForm from "@/app/components/forms/ContactForm"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function ContactPage() {
  const router = useRouter()

  return (
    <div className="relative flex  flex-col tablet:flex-row w-full">
      <section className="fixed top-0 z-30 bg-white flex flex-row justify-between items-center w-full px-3 p-2" >
        <div onClick={() => router.push('/')} >
          <Image src={"/fullLogo.png"} alt={""} width={240} height={40} />
        </div>
        <div className="flex-row  hidden tablet:flex desktop:flex gap-10 mr-10 justify-center items-center text-gray-600 font-semibold cursor-default ">
          <div className="hover:text-[#FFBD59]" onClick={() => router.push('/')} >Home</div>
          <div className="hover:text-[#FFBD59]" onClick={() => router.push('/')}>Aircrafts</div>
          <div className="hover:text-[#FFBD59]" onClick={() => router.push('/')}>Our Crew</div>
          <div className="hover:text-[#FFBD59]" onClick={() => router.push('/about')}>About us</div>
          {/* <div>Become A Pilot</div> */}
          {/* <div>About Us</div> */}
          <button className="py-2 bg-[#FFBD59] text-black px-3 rounded-xl hover:bg-black hover:text-[#FFBD59] ">Contact Us</button>
        </div>
      </section >
      <section className="absolute  tablet:static w-full -z-10 tablet:z-0 tablet:flex tablet:w-1/2">
        <div className="relative w-full tablet:h-screen h-[650px]">
          <Image src={"/mockDesign.png"} alt={""} fill style={{ objectFit: 'cover' }}></Image>
        </div>
      </section>
      <section className="tablet:absolute  flex flex-col tablet:w-1/2 self-center px-10">
        <div className="flex flex-col p-8 tablet:p-14 tablet:mt-0 gap-4  rounded-3xl  bg-white/50 mt-20 font-medium">
          <div className=" flex flex-row text-2xl">
            Have questions about flight training, scheduling, or our programs? We’re here to help! Whether you’re ready to start your journey toward becoming a pilot or just need more information, feel free to reach out.
          </div>
          <div className="flex flex-row gap-4 pl-8">
            <Image src={'/icon/icon_Map.svg'} alt="" width={24} height={24} />
            Location: 1395 Fairplex Dr. Hangar A-6,  La Verne, CA 91750
          </div>
          <div className="flex flex-row  gap-4 pl-8">
            <Image src={'/icon/icon_Phone.svg'} alt="" width={24} height={24} /> Phone: (562) 266-6868
          </div>
          <div className="flex flex-row gap-4 pl-8">
            <Image src={'/icon/icon_Mail.svg'} alt="" width={24} height={24} /> Email: info@skylogixaviation.com</div>
          <div className="flex flex-row gap-4 pl-8">
            <Image src={'/icon/icon_Clock.svg'} alt="" width={24} height={24} /> Hours: Mon-Fri 09:00 am - 04:00 pm
          </div>
        </div>
      </section>
      <section className="flex self-center top-0 w-full tablet:w-1/2  mt-24 mb-10 tablet:mt-0 tablet:mb-0">
        <ContactForm />
      </section>
    </div>
  )
}

