'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"

export default function About() {
  const router = useRouter()
  return (
    <div className="relative flex flex-row w-screen h-screen justify-center gap-10 pt-30">
      <section className="fixed top-0 z-30 bg-white flex flex-row justify-between items-center w-full px-3 p-2" >
        <div onClick={() => router.push('/')} >
          <Image src={"/fullLogo.png"} alt={""} width={240} height={40} />
        </div>
        <div className="flex-row  hidden tablet:flex desktop:flex gap-10 mr-10 justify-center items-center text-gray-600 font-semibold cursor-default ">
          <div className="hover:text-[#FFBD59]" onClick={() => router.push('/')} >Home</div>
          <div className="hover:text-[#FFBD59]" onClick={() => router.push('/')}>Aircrafts</div>
          <div className="hover:text-[#FFBD59]" onClick={() => router.push('/')}>Our Crew</div>
          <div className="hover:text-[#FFBD59]" onClick={() => router.push('/about')}>About us</div>
          <button className="py-2 bg-[#FFBD59] text-black px-3 rounded-xl hover:bg-black hover:text-[#FFBD59]" onClick={() => router.push('/inquiries')}>Contact Us</button>
        </div>
      </section >
      <Image className="absolute -z-10 opacity-40" src={"/backPrint.png"} alt={""} fill />
      <section className="flex flex-col bg-gray-400/80 h-fit px-8 py-4 rounded-2xl gap-3">
        <div className="text-2xl">
          🎓 Certified Flight Instructor (CFI)
        </div>
        <div>
          Icon: 👨‍🏫🛩️ (Instructor + aircraft)
        </div>
        <div>
          Teach others to fly, sharpen your own skills, and build flight hours fast.
        </div>
        <div>
          Requirements:
          <ul className="flex flex-col pl-3 gap-1">
            <li>
              ✅ CPL
            </li>
            <li>
              ✅ FOI & CFI Knowledge Tests
            </li>
            <li>
              ✅ CFI Checkride
            </li>
          </ul>
        </div>
        <div>
          Benefits:
          <ul className="flex flex-col pl-3 gap-1">
            <li>
              Build time toward ATP
            </li>
            <li>
              Earn while you fly
            </li>
            <li>
              Inspire the next generation of pilots
            </li>
          </ul>
        </div>
      </section>
      <section className="flex flex-col bg-gray-400/80 h-fit px-8 py-4 rounded-2xl gap-3">
        <div className="text-2xl">
          🛫 Airline Transport Pilot License(ATP)
        </div>
        <div>
          Icon: ✈️🎯 (Airliner + target)
        </div>
        <div>
          The final goal—required to become an airline captain.
        </div>
        <div>Requirements:
          <ul className="flex flex-col pl-3 gap-1">
            <li>
              ✅ Age: 23 +
            </li>
            <li>
              ✅ CPL + IFR
            </li>
            <li>
              ✅ 1, 500 flight hours total(or less with approved schools)
            </li>
            <li>
              ✅ ATP Knowledge Test & Checkride
            </li>
          </ul>
        </div>
        <div>
          What You’ll Gain:
          <ul className="flex flex-col pl-3 gap-1">
            <li>
              Airline job eligibility
            </li>
            <li>
              Advanced systems training
            </li>
            <li>
              Professional flight experience
            </li>
          </ul>
        </div>
        <div>
          🚀 Ready to Take Off ?
        </div>
        <div>
          Book your Discovery Flight today and get a taste of life in the cockpit.
        </div>
        <div>
          📍 Located at Brackett Field(KPOC)
        </div>
      </section >
    </div >
  )
}