'use client'

import ContactForm from "@/app/inquiries/components/forms/ContactForm"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ContactPage() {
  const router = useRouter()
  const [btnOpen, setBtnOpen] = useState(false)
  return (
    <div className="relative flex flex-col tablet:flex-row w-full">
      <section className="fixed top-0 z-30 bg-white hidden tablet:flex flex-row justify-between items-center w-full px-3 p-2" >
        <div onClick={() => router.push('/')} >
          <Image src={"/fullLogo.png"} alt={""} width={240} height={40} priority />
        </div>
        <div className="flex-row  hidden tablet:flex desktop:flex gap-10 mr-10 justify-center items-center text-gray-600 font-semibold cursor-default ">
          <div className="hover:text-[#FFBD59]" onClick={() => router.push('/')} >Home</div>
          <div className="hover:text-[#FFBD59]" onClick={() => router.push('/')}>Aircrafts</div>
          <div className="hover:text-[#FFBD59]" onClick={() => router.push('/')}>Our Crew</div>
          <div className="hover:text-[#FFBD59]" onClick={() => router.push('/becomepilot')}>Become A Pilot</div>
          {/* <div>Become A Pilot</div> */}
          {/* <div>About Us</div> */}
          <button className="py-2 bg-[#FFBD59] text-black px-3 rounded-xl hover:bg-black hover:text-[#FFBD59]">Contact Us</button>
        </div>
      </section >
      <section className="fixed z-30 bg-white tablet:hidden flex flex-row justify-between items-center w-full px-3 py-2 left-0 top-0 shadow-md">
        <div onClick={() => router.push('/')} className="cursor-pointer">
          <Image src={"/fullLogo.png"} alt="Full Logo" width={180} height={20} />
        </div>

        {/* 햄버거 메뉴 버튼 */}
        <div onClick={() => setBtnOpen(!btnOpen)} className="cursor-pointer">
          <Image src={"/icon/icon_menu_yellow.svg"} alt="Menu Icon" width={32} height={32} />
        </div>

        {/* 사이드바 */}
        {btnOpen && (
          <div className="fixed inset-0 z-20 tablet:hidden">
            {/* 배경 오버레이 */}
            <div className="absolute inset-0 bg-black/40 bg-opacity-30 backdrop-blur-sm" onClick={() => setBtnOpen(false)} />

            {/* 슬라이딩 메뉴 */}
            <div className={`absolute right-0 top-0 h-full w-[75%] max-w-xs bg-white shadow-lg rounded-l-2xl transform transition-transform duration-500 ease-in-out translate-x-0`}>
              {/* 닫기 버튼 */}
              <div className="flex justify-end p-4">
                <button onClick={() => setBtnOpen(false)} className="p-1 rounded hover:bg-gray-100">
                  <Image src={"/icon/icon_x.svg"} alt="Close" width={28} height={28} />
                </button>
              </div>

              {/* 메뉴 리스트 */}
              <div className="flex flex-col gap-4 justify-center items-center px-6 text-gray-700 font-semibold">
                <div className="text-lg w-full border-b py-2 text-center hover:text-[#FFBD59] cursor-pointer" onClick={() => router.push('/')}>Home</div>
                <div className="text-lg w-full border-b py-2 text-center hover:text-[#FFBD59] cursor-pointer" onClick={() => router.push('/')}>Aircrafts</div>
                <div className="text-lg w-full border-b py-2 text-center hover:text-[#FFBD59] cursor-pointer" onClick={() => router.push('/')}>Our Crew</div>
                <div className="text-lg py-2 hover:text-[#FFBD59] cursor-pointer" onClick={() => router.push('/becomepilot')}>Become A Pilot</div>

                <button
                  className="text-lg py-2 w-full bg-[#FFBD59] text-black rounded-xl hover:bg-black hover:text-[#FFBD59] transition-colors"
                  onClick={() => router.push('/inquiries')}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
      <section className="absolute tablet:static w-full -z-10 tablet:z-0 tablet:flex tablet:w-1/2">
        <div className="relative w-full tablet:h-screen h-[550px]">
          <Image src={"/mockDesign.png"} alt={""} fill style={{ objectFit: 'cover' }}></Image>
        </div>
      </section>
      <section className="tablet:absolute  flex flex-col tablet:w-1/2 self-center px-8">
        <div className="flex flex-col p-6 tablet:p-14 tablet:mt-0 gap-4  rounded-3xl  bg-white/50 mt-20 font-medium">
          <div className=" flex flex-row  text-xl tablet:text-2xl">
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

