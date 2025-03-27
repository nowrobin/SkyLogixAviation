'use client'
import { useState } from "react";
import Image from "next/image";
// import PlaneItems from "@/app/components/planeItmes";

export default function Home() {
  const [btnOpen, setBtnOpen] = useState(false)
  return (
    <div className="relative flex flex-col gap-2 w-full pt-6">
      <section className=" flex flex-row justify-between items-center w-full px-3">
        <div>
          <Image src={"/fullLogo.png"} alt={""} width={240} height={40} />
        </div>
        <div className="flex-row hidden desktop:flex gap-5 mr-10">
          <div>About</div>
          <div>Contact</div>
          <div>Schedule</div>
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
          <div className="text-6xl font-bold">Learn to Fly an Aircraft</div>
          <div className="text-4xl ">in a way that is quick, easy, and efficient</div>
          <button className="py-2 bg-black text-white px-3 rounded-xl mt-5">
            Schedule Now! (Old Customer)
          </button>

        </div>

      </div>
      {/* <main>
        <section>
          <PlaneItems images={[]} descriptions={""} name={""}></PlaneItems>
        </section>
      </main> */}
    </div>
  );
}
