'use client'
import Image from "next/image"
import { useState } from "react"
type PlaneDetails = {
  images: string[],
  descriptions: string[],
  odd: boolean
  comingSoon?: boolean
}


export default function PlaneItems({ images, descriptions: desc, odd, comingSoon }: PlaneDetails) {
  const [imageIndex, setImageIndex] = useState(0)
  const handlePrev = () => {
    if (imageIndex === 0) {
      setImageIndex(images.length - 1)
    } else
      setImageIndex(imageIndex - 1)
  }
  const handleNext = () => {
    if (imageIndex === images.length - 1) {
      setImageIndex(0)
    } else
      setImageIndex(imageIndex + 1)
  }
  return (
    <div className="flex flex-row rounded-3xl gap-20 w-full justify-center h-[20rem] items-center">
      {
        comingSoon ?
          <div className="flex flex-row w-[1048px] justify-between h-full ">
            <section className="relative flex flex-row justify-center items-center w-[480px] h-[18rem] rounded-xl shadow-2xl ">
              <div>
                <Image className="rounded-xl bg-transparent" src={images[imageIndex]} alt={"PlaneImages"} fill style={{ objectFit: 'cover', position: "absolute" }} /></div>
            </section>
            <article className="flex flex-col w-[480px] gap-2 h-full justify-center items-center">
              <div className="text-5xl font-bold font-winky">Coming Soon ...</div>
            </article >
          </div>
          :
          odd ? <div className="flex flex-row w-[1048px] justify-between ">
            <section className="relative flex flex-row justify-center items-center w-[480px] h-[18rem] rounded-xl shadow-2xl ">
              <button className="absolute left-0 z-10 h-full rounded-l-xl" onClick={handlePrev}>
                <Image src={'/icon/chev_left_white.svg'} alt={"chevIcon"} width={48} height={48} />
              </button>
              <div>
                <Image className="rounded-xl bg-transparent" src={images[imageIndex]} alt={"PlaneImages"} fill style={{ objectFit: 'cover', position: "absolute" }} /></div>
              <button className="absolute right-0  z-10 h-full rounded-r-xl" onClick={handleNext}>
                <Image src={'/icon/chev_right_white.svg'} alt={"chevIcon"} width={48} height={48} />
              </button>
            </section>
            <article className="flex flex-col w-[480px] gap-2 h-full justify-center">
              <div className="text-5xl font-bold font-winky">N49202</div>
              <div className="text-xl font-semibold text-gray-500">1977 Cessna 152 II</div>
              <div className="text-xl font-semibold text-gray-500">Lycoming O-235-L2C (115HP)</div>
              <div className="text-xl font-semibold text-gray-500">Flight Rule: IFR</div>
              <div className="text-xl font-semibold text-gray-500">Price:$120 /hr (Wet)</div>
              <div className="text-xl font-semibold text-gray-500">The Cessna 152 is a reliable, fuel-efficient two-seat trainer, perfect for safe and affordable flight training.</div>
            </article >

          </div> :
            <div className="flex flex-row w-[1048px] justify-between ">
              <article className="flex flex-col w-[480px] gap-2 h-full justify-center">
                <div className="text-5xl font-bold font-winky">N4900L</div>
                <div className="text-xl font-semibold text-gray-500">1980 Cessna 152 II</div>
                <div className="text-xl font-semibold text-gray-500">Lycoming O-235-L2C (115HP)</div>
                <div className="text-xl font-semibold text-gray-500">Flight Rule: IFR</div>
                <div className="text-xl font-semibold text-gray-500">Price:$120 /hr (Wet)</div>
                <div className="text-xl font-semibold text-gray-500">The Cessna 152 is a reliable, fuel-efficient two-seat trainer, perfect for safe and affordable flight training.</div>
              </article >
              <section className="relative flex flex-row justify-center items-center w-[480px] h-[18rem] rounded-xl shadow-2xl ">
                <button className="absolute left-0 z-10 h-full rounded-l-xl" onClick={handlePrev}>
                  <Image src={'/icon/chev_left_white.svg'} alt={"chevIcon"} width={48} height={48} />
                </button>
                <div>
                  <Image className="rounded-xl bg-transparent" src={images[imageIndex]} alt={"PlaneImages"} fill style={{ objectFit: 'cover', position: "absolute" }} /></div>
                <button className="absolute right-0  z-10 h-full rounded-r-xl" onClick={handleNext}>
                  <Image src={'/icon/chev_right_white.svg'} alt={"chevIcon"} width={48} height={48} />
                </button>
              </section>
            </div>
      }

    </div >
  )
}