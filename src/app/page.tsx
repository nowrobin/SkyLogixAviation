'use client'
import { useState } from "react";
import Image from "next/image";
import PlaneItems from "@/app/components/planeItmes";
// import PlaneItems from "@/app/components/planeItmes";

export default function Home() {
  const [btnOpen, setBtnOpen] = useState(false)
  return (
    <div className="relative flex flex-col w-full">
      <section className=" flex flex-row justify-between items-center w-full px-3 p-2">
        <div>
          <Image src={"/fullLogo.png"} alt={""} width={240} height={40} />
        </div>
        <div className="flex-row hidden tablet:flex desktop:flex gap-10 mr-10 justify-center items-center text-gray-600 font-semibold">
          <div>Home</div>
          <div>Become A Pilot</div>
          <div>Aircraft</div>
          <div>Instructor</div>
          <div>About Us</div>
          <button className="py-2 bg-black text-white px-3 rounded-xl">Contact Us</button>
        </div>
        <div className="mobile:hidden" onClick={() => setBtnOpen((prev) => (!prev))} >
          ==
        </div>
        {
          btnOpen &&
          <div className="absolute flex flex-col gap-10 bg-blue-400 w-11/12 right-0 top-0">
            <div onClick={() => setBtnOpen((prev) => (!prev))} >X</div>
            <div>About</div>
            <div>Contact</div>
            <div>Schedule</div>
          </div>
        }
      </section>
      <div className="relative w-full h-[700px] flex">
        <Image src={"/landing_Image.png"} alt={""} style={{ objectFit: "fill" }} fill loading="lazy" />
        <div className="absolute flex flex-col justify-center items-center size-full gap-3">
          <div className="text-6xl font-bold">Learn to Fly</div>
          <div className="text-4xl ">in a way that is quick, easy, and efficient</div>
          <button className="py-2 bg-black text-white px-3 rounded-xl mt-5">
            Contact Us
          </button>

        </div>

      </div>
      <main>
        <section className=" flex flex-col gap-30 justify-center py-32">
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
        </section>
      </main>
    </div>
  );
}
