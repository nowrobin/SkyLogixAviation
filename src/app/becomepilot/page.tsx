'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function BecomePilot() {


  const cardData = [
    {
      title: '1. Private Pilot License (PPL)',
      icon: '✈️ 🧍‍♂️🛩️',
      description: 'Your foundation in aviation. Fly solo, take passengers, and explore the skies for fun.',
      borderColor: 'border-blue-500',
      requirements: ['✅ Age: 17+', '✅ 40+ flight hours (20 dual / 10 solo)', '✅ Pass FAA Knowledge Test & Checkride', '✅ 3rd-Class Medical Certificate'],
      learns: ['Aircraft control', 'Cross-country navigation', 'Weather basics', 'Radio communication', 'Emergency procedures']
    },
    {
      title: '2. Instrument Rating (IFR)',
      icon: '☁️ 🌫️🧭',
      description: 'Fly safely through clouds, fog, and limited visibility—critical for serious pilots.',
      borderColor: 'border-indigo-500',
      requirements: ['✅ PPL', '✅ 50+ hours cross-country PIC', '✅ 40+ hours instrument time', '✅ Instrument Knowledge Test & Checkride'],
      learns: ['Instrument-only flying', 'Holding patterns & approach procedures', 'IFR charts & procedures', 'Weather analysis']
    },
    {
      title: '3. Commercial Pilot License (CPL)',
      icon: '💼 👨‍✈️💰',
      description: 'Start getting paid to fly—step into the world of professional aviation.',
      borderColor: 'border-yellow-500',
      requirements: ['✅ Age: 18+', '✅ PPL + IFR', '✅ 250 total hours', '✅ Commercial Knowledge Test & Checkride'],
      learns: ['Complex aircraft operation', 'Advanced maneuvers', 'Precision flying techniques']
    },
    {
      title: '4. Certified Flight Instructor (CFI)',
      icon: '🎓 👨‍🏫🛩️',
      description: 'Teach others to fly, sharpen your own skills, and build flight hours fast.',
      borderColor: 'border-green-500',
      requirements: ['✅ CPL', '✅ FOI & CFI Knowledge Tests', '✅ CFI Checkride'],
      learns: ['Build time toward ATP', 'Earn while you fly', 'Inspire the next generation of pilots']
    },
    {
      title: '5. Airline Transport Pilot License (ATP)',
      icon: '🛫 ✈️🎯',
      description: 'The final goal—required to become an airline captain.',
      borderColor: 'border-red-500',
      requirements: ['✅ Age: 23+', '✅ CPL + IFR', '✅ 1,500 flight hours total (or less with approved schools)', '✅ ATP Knowledge Test & Checkride'],
      learns: ['Airline job eligibility', 'Advanced systems training', 'Professional flight experience']
    }
  ]


  const router = useRouter()
  const [btnOpen, setBtnOpen] = useState(false)
  return (
    <div className="relative flex flex-col tablet:px-0 w-screen h-auto tablet:h-screen justify-center pt-10 tablet:my-54 pb-10 tablet:pb-0">
      <section className="fixed top-0 left-0 z-30 hidden tablet:flex bg-white  flex-row justify-between items-center w-full h-16 px-3 p-2" >
        <div onClick={() => router.push('/')} >
          <Image src={"/fullLogo.png"} alt={""} width={240} height={40} />
        </div>
        <div className="flex-row  hidden tablet:flex desktop:flex gap-10 mr-10 justify-center items-center text-gray-600 font-semibold cursor-default ">
          <div className="hover:text-[#FFBD59]" onClick={() => router.push('/')} >Home</div>
          <div className="hover:text-[#FFBD59]" onClick={() => router.push('/')}>Aircrafts</div>
          <div className="hover:text-[#FFBD59]" onClick={() => router.push('/')}>Our Crew</div>
          <div className="hover:text-[#FFBD59]" onClick={() => router.push('/becomepilot')}>Become A Pilot</div>
          <button className="py-2 bg-[#FFBD59] text-black px-3 rounded-xl hover:bg-black hover:text-[#FFBD59]" onClick={() => router.push('/inquiries')}>Contact Us</button>
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
      {/* <Image className="absolute -z-10 opacity-40" src={"/backPrint.png"} alt={""} fill /> */}
      <div className="flex font-semibold tablet:px-30 tablet:pt-4 tablet:text-2xl text-center p-4">At Skylogix Aviation, we’re more than just a flight school—we’re your launchpad to the airlines. Here’s a step-by-step guide with visual cues to help you see where you’re headed</div>

      <div className="py-2 px-4 tablet:px-32 tablet:py-4 mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-gray-200">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`bg-white rounded-xl shadow-md border-l-4 ${card.borderColor} p-6 flex flex-col justify-between tablet:min-h-[420px] h-full`}
          >
            <div>
              <h2 className="text-xl font-bold mb-2 flex items-center">
                <span className="text-2xl mr-2">{card.icon.split(' ')[0]}</span>
                {card.title}
                <span className="ml-2 text-xl">{card.icon.split(' ')[1]}</span>
              </h2>
              <p className="text-gray-600 mb-4">{card.description}</p>

              <h4 className="text-lg font-semibold mb-1">Requirements:</h4>
              <ul className="list-disc list-inside mb-4 text-sm">
                {card.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>

              <h4 className="text-lg font-semibold mb-1">
                {card.title.includes('CFI') ? 'Benefits:' : card.title.includes('ATP') ? 'What You’ll Gain:' : 'You’ll Learn:'}
              </h4>
              <ul className="list-disc list-inside text-sm">
                {card.learns.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-white text-center p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-2 flex justify-center items-center">
          <span className="text-3xl mr-2">🚀</span> Ready to Take Off?
        </h2>
        <p className="mb-2 text-gray-700">
          Book your <strong>Discovery Flight</strong> today and get a taste of life in the cockpit.
        </p>
        <p className="text-sm text-gray-500">📍 Located at Brackett Field (KPOC)</p>
      </div>
    </div >
  )
}