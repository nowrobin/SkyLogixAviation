'use client'
import { useRef, useState } from "react";
import Image from "next/image";
import PlaneItems from "@/app/components/planeItmes";
import { useRouter } from "next/navigation";
// import PlaneItems from "@/app/components/planeItmes";

export default function Home() {
  const [btnOpen, setBtnOpen] = useState(false)
  const [crew, setCrew] = useState(0)

  const handleTopClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sectionAirCraftRef = useRef<HTMLDivElement | null>(null);
  const sectionCrewRef = useRef<HTMLDivElement | null>(null);

  const scrollToSectionAirCraft = () => {
    if (sectionAirCraftRef.current) {
      const y = sectionAirCraftRef.current?.getBoundingClientRect().top + window.scrollY;
      const offset = 70; // 고정된 헤더 높이만큼
      window.scrollTo({ top: y - offset, behavior: 'smooth' });
    }
  };
  const scrollToSectionCrew = () => {
    if (sectionCrewRef.current) {
      const y = sectionCrewRef.current?.getBoundingClientRect().top + window.scrollY;
      const offset = 40; // 고정된 헤더 높이만큼
      window.scrollTo({ top: y - offset, behavior: 'smooth' });
    }
  };


  // const handleNextCrew = () => {
  //   if (crew == 2) {
  //     setCrew(0)
  //   } else {
  //     setCrew(crew + 1)
  //   }
  // }
  // const handlePrevCrew = () => {
  //   if (crew == 0) {
  //     setCrew(2)
  //   } else {
  //     setCrew(crew - 1)
  //   }
  // }
  const router = useRouter()



  return (
    <div className="relative flex flex-col justify-center items-center">
      <section className="fixed z-30 bg-white hidden tablet:flex flex-row justify-between items-center w-full px-3 p-2 left-0 top-0">
        <div onClick={() => router.push('/')}  >
          <Image src={"/fullLogo.png"} alt={""} width={240} height={40} />
        </div>
        <div className="flex-row  hidden tablet:flex desktop:flex gap-10 mr-10 justify-center items-center text-gray-600 font-semibold cursor-default ">
          <div className="hover:text-[#FFBD59]" onClick={handleTopClick}>Home</div>
          <div className="hover:text-[#FFBD59]" onClick={scrollToSectionAirCraft}>Aircrafts</div>
          <div className="hover:text-[#FFBD59]" onClick={scrollToSectionCrew}>Our Crew</div>
          <div className="hover:text-[#FFBD59]" onClick={() => router.push('/becomepilot')}>Become A Pilot</div>
          <button className="py-2 bg-[#FFBD59] text-black px-3 rounded-xl hover:bg-black hover:text-[#FFBD59]" onClick={() => router.push('/inquiries')} >Contact Us</button>
        </div>
      </section>
      <section className="fixed z-30 bg-white  tablet:hidden flex flex-row justify-between items-center w-full px-3 p-2 left-0 top-0">
        <div onClick={() => router.push('/')}  >
          <Image src={"/fullLogo.png"} alt={""} width={180} height={20} />
        </div>
        <div onClick={() => setBtnOpen(!btnOpen)}>
          <Image src={"/icon/icon_menu_yellow.svg"} alt={""} width={32} height={32} />
        </div>
        {btnOpen &&
          <div className={`fixed tablet:hidden z-20 top-0 right-0 bg-white w-6/8 h-full transform transition-transform duration-500 ease-in-out ${btnOpen ? 'translate-0' : 'translate-x-full'}`}>
            <div className="flex justify-end m-3" onClick={() => setBtnOpen(!btnOpen)}>
              <Image src={"/icon/icon_x.svg"} alt={""} width={32} height={32} />
            </div>
            <div className="flex flex-col  gap-3 justify-center items-center text-gray-600 font-semibold cursor-default ">
              <div className="text-xl w-full border flex justify-center py-2 hover:text-[#FFBD59]" onClick={handleTopClick}>Home</div>
              <div className="text-xl w-full border flex justify-center py-2 hover:text-[#FFBD59]" onClick={scrollToSectionAirCraft}>Aircrafts</div>
              <div className="text-xl w-full border flex justify-center py-2 hover:text-[#FFBD59]" onClick={scrollToSectionCrew}>Our Crew</div>
              <div className="hover:text-[#FFBD59]" onClick={() => router.push('/becomepilot')}>Become A Pilot</div>
              <button className="text-xl  py-2 bg-[#FFBD59] text-black px-3 rounded-xl hover:bg-black hover:text-[#FFBD59]" onClick={() => router.push('/inquiries')} >Contact Us</button>
            </div>
          </div>
        }
      </section >
      <section className="relative flex w-full h-[400px] tablet:h-[700px]">
        <Image className="absolute top-0 left-0 -z-10" src={"/landing_Image.png"} alt={"Landing Image"} style={{ objectFit: "cover" }} fill loading="lazy" />
        <div className="flex flex-col justify-center items-center size-full gap-3">
          <div className="text-5xl tablet:text-6xl font-bold">Learn to Fly</div>
          <div className="text-2xl  text-center tablet:text-4xl">in a way that is quick, easy, and efficient</div>
          <button className="py-2 bg-[#FFBD59] text-black font-semibold px-3 rounded-xl mt-5" onClick={() => router.push('/inquiries')}>
            Contact Us
          </button>
        </div>
      </section>
      <section className="relative w-full flex flex-col px-10 desktop:px-60 tablet:h-[700px] desktop:flex-row gap-4 items-center justify-center my-10 tablet:my-24">
        <div className="absolute left-0 size-full opacity-40">
          <Image src={"/backPrint.png"} alt={"bakcPrint"} fill />
        </div>
        <div className=" flex tablet:flex-1 text-3xl tablet:text-6xl text-[#FFBD59] font-bold text-center z-10 tablet:leading-18 mt-4 ">Welcome to
          <br />Skylogix  Aviation</div>
        <div className="tablet:flex-1 tablet:text-xl font-medium justify-center  z-10 bg-white/40 p-4">where your aviation dreams take flight! We are dedicated to providing high-quality, affordable flight training in our well-maintained Cessna 152 aircrafts. Our mission is to make flying accessible while maintaining the highest safety standards, ensuring that every student can pursue their passion for aviation without financial barriers. Beyond training, we are committed to fostering a supportive and inspiring community where students and instructors work together to achieve their ultimate goal becoming airline transport pilots. Join us and start your journey to the skies today!
        </div>
      </section>
      <section ref={sectionAirCraftRef} className="bg-gray-200/40 w-screen">
        <div className={"pl-10 tablet:pl-60 tablet:text-6xl font-bold text-[#FFBD59] my-6 tablet:my-12 text-4xl "}>Aircrafts</div>
        <div className=" flex flex-col gap-10 tablet:gap-30 justify-center pb-12 tablet:pb-32">
          <PlaneItems images={[
            '/N49202/N49202_1.jpeg',
            '/N49202/N49202_2.jpeg',
            '/N49202/N49202_3.jpeg',
            '/N49202/N49202_4.jpeg',
            '/N49202/N49202_5.jpeg',
            '/N49202/N49202_6.jpeg',
          ]} descriptions={[]} odd={true} />
          <PlaneItems images={[
            '/N4900L/N4900L_1.jpeg',
            '/N4900L/N4900L_2.jpeg',
            '/N4900L/N4900L_3.jpeg',
            '/N4900L/N4900L_4.jpeg',
            '/N4900L/N4900L_5.jpeg',
            '/N4900L/N4900L_6.jpeg'
          ]} descriptions={[]} odd={false} />
          <PlaneItems images={[
            '/coming_soon.png'
          ]} descriptions={[]} odd={true}
            comingSoon={true} />
        </div>
      </section>
      <section ref={sectionCrewRef} className="flex flex-col items-center  bg-white w-full h-[700px] mb-3">
        <div className={"text-4xl tablet:text-6xl font-bold text-[#FFBD59] my-12 "}>Our Crew</div>
        <div className="flex flex-row gap-5 mb-6 items-center">
          <button onClick={() => setCrew(0)} className={`transition-all duration-400  rounded-xl py-2 px-3  ${crew === 0 ? "text-xl font-bold text-[#FFBD59] bg-black" : "text-sm text-black bg-gray-300 "}`}>Founder</button>
          <button onClick={() => setCrew(1)} className={`transition-all duration-400  rounded-xl py-2 px-3 ${crew === 1 ? "text-xl font-bold text-[#FFBD59]  bg-black" : "text-sm text-black bg-gray-300"}`}>Instructor</button>
          <button onClick={() => setCrew(2)} className={`transition-all duration-400  rounded-xl py-2 px-3 ${crew === 2 ? "text-xl font-bold text-[#FFBD59]  bg-black" : "text-sm text-black bg-gray-300"}`}>Mechanic</button>
        </div>
        <div >
          {
            crew === 0 ?
              <div className="flex flew-row gap-10 mt-[52px]">
                <div className="relative w-36 h-48 tablet:w-[288px] tablet:h-[380px]  shadow-2xl rounded-2xl animate-fadeIn">
                  <Image className="rounded-2xl" src={"/coming_soon.png"} alt={""} fill
                    style={{ objectFit: 'cover' }} />
                </div>
              </div> :
              crew === 1 ?
                <div className="flex flex-col gap-6">
                  <div className="self-center justify-center tablet:text-xl font-semibold text-gray-500">Instruction: $55 / hr</div>
                  <div className="grid grid-cols-2 tablet:flex tablet:flew-row gap-10">
                    <div className="relative w-36 h-48 tablet:w-[288px] tablet:h-[380px] shadow-2xl rounded-2xl animate-fadeIn">
                      <Image className="rounded-2xl" src={"/coming_soon.png"} alt={""} fill
                        style={{ objectFit: 'cover' }} />
                    </div>
                    <div className="relative w-36 h-48 tablet:w-[288px] tablet:h-[380px]  shadow-2xl rounded-2xl animate-fadeIn">
                      <Image className="rounded-2xl" src={"/coming_soon.png"} alt={""} fill
                        style={{ objectFit: 'cover' }} />
                    </div>
                    <div className="relative w-36 h-48 tablet:w-[288px] tablet:h-[380px] shadow-2xl rounded-2xl animate-fadeIn">
                      <Image className="rounded-2xl" src={"/coming_soon.png"} alt={""} fill
                        style={{ objectFit: 'cover' }} />
                    </div>
                  </div>
                </div> :
                <div className="flex flew-row gap-3 mt-[52px]">
                  <div className="grid grid-cols-2 tablet:flex tablet:flew-row gap-10">
                    <div className="relative w-36 h-48 tablet:w-[288px] tablet:h-[380px]  shadow-2xl rounded-2xl animate-fadeIn">
                      <Image className="rounded-2xl" src={"/coming_soon.png"} alt={""} fill
                        style={{ objectFit: 'cover' }} />
                    </div>
                    <div className="relative w-36 h-48 tablet:w-[288px] tablet:h-[380px]  shadow-2xl rounded-2xl animate-fadeIn">
                      <Image className="rounded-2xl" src={"/coming_soon.png"} alt={""} fill
                        style={{ objectFit: 'cover' }} />
                    </div>
                  </div>
                </div>
          }
        </div>
      </section >
    </div >
  );
}
