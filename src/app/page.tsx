'use client'
import { useRef, useState } from "react";
import Image from "next/image";
import PlaneItems from "@/app/components/planeItmes";
import { usePathname, useRouter } from "next/navigation";
// import PlaneItems from "@/app/components/planeItmes";

export default function Home() {
  // const [btnOpen, setBtnOpen] = useState(false)
  const [crew, setCrew] = useState(0)


  const handleTopClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sectionAirCraftRef = useRef<HTMLDivElement | null>(null);
  const sectionCrewRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = () => {
    if (sectionAirCraftRef.current) {
      const y = sectionAirCraftRef.current?.getBoundingClientRect().top + window.scrollY;
      const offset = 80; // 고정된 헤더 높이만큼
      window.scrollTo({ top: y - offset, behavior: 'smooth' });
    }
    if (sectionCrewRef.current) {
      const y = sectionCrewRef.current?.getBoundingClientRect().top + window.scrollY;
      const offset = 40; // 고정된 헤더 높이만큼
      window.scrollTo({ top: y - offset, behavior: 'smooth' });
    }

  };



  const handleNextCrew = () => {
    if (crew == 2) {
      setCrew(0)
    } else {
      setCrew(crew + 1)
    }
  }
  const handlePrevCrew = () => {
    if (crew == 0) {
      setCrew(2)
    } else {
      setCrew(crew - 1)
    }
  }
  const router = useRouter()
  const pathname = usePathname()
  console.log(pathname)


  return (
    <div className="relative flex flex-col w-full">
      <section className="fixed z-30 bg-white flex flex-row justify-between items-center w-full px-3 p-2">
        <div onClick={() => router.push('/')}  >
          <Image src={"/fullLogo.png"} alt={""} width={240} height={40} />
        </div>
        <div className="flex-row  hidden tablet:flex desktop:flex gap-10 mr-10 justify-center items-center text-gray-600 font-semibold cursor-default ">
          <div className="hover:text-[#FFBD59]" onClick={handleTopClick}>Home</div>
          <div className="hover:text-[#FFBD59]" onClick={scrollToSection}>Aircrafts</div>
          <div className="hover:text-[#FFBD59]" onClick={scrollToSection}>Our Crew</div>
          {/* <button disabled>Become A Pilot</button> */}
          {/* <div>About Us</div> */}
          <button className="py-2 bg-[#FFBD59] text-black px-3 rounded-xl" onClick={() => router.push('/Contact')} >Contact Us</button>
        </div>
      </section>
      <div className="relative w-full h-[700px] flex">
        <Image src={"/landing_Image.png"} alt={""} style={{ objectFit: "fill" }} fill loading="lazy" />
        <div className="absolute flex flex-col justify-center items-center size-full gap-3">
          <div className="text-6xl font-bold">Learn to Fly</div>
          <div className="text-4xl ">in a way that is quick, easy, and efficient</div>
          <button className="py-2 bg-[#FFBD59] text-black font-semibold px-3 rounded-xl mt-5" onClick={() => router.push('/Contact')}>
            Contact Us
          </button>
        </div>
      </div>
      <div className="relative px-60 h-[700px] flex flex-row gap-4 items-center justify-center mt-24 mb-24">
        <div className="absolute  left-0 size-full opacity-40">
          <Image src={"/backPrint.png"} alt={""} fill />
        </div>
        <div className="flex-1 text-6xl text-[#FFBD59] font-bold text-center z-10 leading-18">Welcome to Skylogix <br /> Aviation</div>
        <div className="flex-1 text-xl  font-medium justify-center  z-10 bg-white/40 p-4">where your aviation dreams take flight! We are dedicated to providing high-quality, affordable flight training in our well-maintained Cessna 152 aircrafts. Our mission is to make flying accessible while maintaining the highest safety standards, ensuring that every student can pursue their passion for aviation without financial barriers. Beyond training, we are committed to fostering a supportive and inspiring community where students and instructors work together to achieve their ultimate goal becoming airline transport pilots. Join us and start your journey to the skies today!
        </div>
      </div>
      <section ref={sectionAirCraftRef} className="bg-gray-200/40">
        <div className={"pl-60 text-6xl font-bold text-[#FFBD59] my-12 "}>Aircrafts</div>
        <div className=" flex flex-col gap-30 justify-center pb-32">
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
      <section ref={sectionCrewRef} className="flex flex-col items-center  bg-white w-full h-[700px]">
        <div className={"text-6xl font-bold text-[#FFBD59] my-12 "}>Our Crew</div>
        <div className="flex flex-row gap-5 mb-10">
          <button onClick={() => setCrew(0)} className={`transition-all duration-400 ${crew === 0 ? "text-xl font-bold text-[#FFBD59] p-2 " : "text-gray-400 "}`}>Founder</button> /
          <button onClick={() => setCrew(1)} className={`transition-all duration-400 ${crew === 1 ? "text-xl font-bold text-[#FFBD59] p-2 " : "text-gray-400 "}`}> Instructors </button> /
          <button onClick={() => setCrew(2)} className={`transition-all duration-400 ${crew === 2 ? "text-xl font-bold text-[#FFBD59] p-2 " : "text-gray-400 "}`}>Mechanics</button>
        </div>
        <div>
          {
            crew === 0 ?
              <div className="flex flew-row gap-3">
                <button onClick={handlePrevCrew}>
                  <Image src={"/icon/chev_left.svg"} alt={""} width={40} height={40} />
                </button>
                <div className="relative w-44 h-56 border">
                  <Image src={"/coming_soon.png"} alt={""} fill
                    style={{ objectFit: 'cover' }} />
                </div>
                <button onClick={handleNextCrew}>
                  <Image src={"/icon/chev_right.svg"} alt={""} width={40} height={40} />
                </button>
              </div> :
              crew === 1 ?
                <div className="flex flew-row gap-3">
                  <button onClick={handlePrevCrew}>
                    <Image src={"/icon/chev_left.svg"} alt={""} width={40} height={40} />
                  </button>
                  <div className="relative w-44 h-56 border">
                    <Image src={"/coming_soon.png"} alt={""} fill
                      style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="relative w-44 h-56 border">
                    <Image src={"/coming_soon.png"} alt={""} fill
                      style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="relative w-44 h-56 border">
                    <Image src={"/coming_soon.png"} alt={""} fill
                      style={{ objectFit: 'cover' }} />
                  </div>
                  <button onClick={handleNextCrew}>
                    <Image src={"/icon/chev_right.svg"} alt={""} width={40} height={40} />
                  </button>
                </div> :
                <div className="flex flew-row gap-3">
                  <button onClick={handlePrevCrew}>
                    <Image src={"/icon/chev_left.svg"} alt={""} width={40} height={40} />
                  </button>
                  <div className="relative w-44 h-56 border">
                    <Image src={"/coming_soon.png"} alt={""} fill
                      style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="relative w-44 h-56 border">
                    <Image src={"/coming_soon.png"} alt={""} fill
                      style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="relative w-44 h-56 border">
                    <Image src={"/coming_soon.png"} alt={""} fill
                      style={{ objectFit: 'cover' }} />
                  </div>
                  <button onClick={handleNextCrew}>
                    <Image src={"/icon/chev_right.svg"} alt={""} width={40} height={40} />
                  </button>
                </div>
          }
        </div>
      </section >
    </div >
  );
}
