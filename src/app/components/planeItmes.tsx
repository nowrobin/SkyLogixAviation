"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
type PlaneDetails = {
  name: string;
  images: string[];
  descriptions: string[];
  odd: boolean;
  comingSoon?: boolean;
};

export default function PlaneItems({
  name,
  images,
  odd,
  comingSoon,
  descriptions,
}: PlaneDetails) {
  const [imageIndex, setImageIndex] = useState(0);
  const handlePrev = () => {
    if (imageIndex === 0) {
      setImageIndex(images.length - 1);
    } else setImageIndex(imageIndex - 1);
  };
  const handleNext = () => {
    if (imageIndex === images.length - 1) {
      setImageIndex(0);
    } else setImageIndex(imageIndex + 1);
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // Trigger animation when visible
          }
        });
      },
      { threshold: 0.7 } // 50% 이상 보이면 애니메이션 시작
    );

    const target = document.getElementById("slide-div");
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, []);

  return (
    <div
      id="slide-div"
      className={`flex  rounded-3xl tablet:gap-10 desktop:gap-20 w-full justify-center h-fit items-center tablet:transition-transform duration-1000 inset-0  ${
        odd
          ? isVisible
            ? "tablet:translate-x-0"
            : "tablet:-translate-x-72"
          : isVisible
          ? "tablet:translate-x-0"
          : "tablet:translate-x-72"
      }`}
    >
      {comingSoon ? (
        <div className="flex flex-col gap-10 tablet:flex-row desktop:flex-row px-4 desktop:w-[1048px] justify-between h-full">
          <section className="relative flex flex-row justify-center items-center tablet:w-[480px] h-[18rem] rounded-xl shadow-2xl ">
            <div className="">
              <Image
                className="rounded-xl bg-transparent"
                src={images[imageIndex]}
                alt={"PlaneImages"}
                fill
                style={{ objectFit: "cover", position: "absolute" }}
              />
            </div>
          </section>
          <article className="flex flex-col tablet:w-[480px] gap-2 h-full justify-center items-center">
            <div className="text-3xl tablet:text-5xl font-bold font-winky">
              Coming Soon ...
            </div>
          </article>
        </div>
      ) : odd ? (
        <div className="flex flex-col gap-10 tablet:flex-row desktop:flex-row  px-4 desktop:w-[1048px] justify-between h-full">
          <section className="relative flex flex-row justify-center items-center  tablet:w-[480px] h-[18rem] rounded-xl shadow-2xl ">
            <button
              className="absolute left-0 z-10 h-full rounded-l-xl"
              onClick={handlePrev}
            >
              <Image
                src={"/icon/chev_left_white.svg"}
                alt={"chevIcon"}
                width={48}
                height={48}
              />
            </button>
            <div>
              <Image
                className="rounded-xl bg-transparent"
                src={images[imageIndex]}
                alt={"PlaneImages"}
                fill
                style={{ objectFit: "cover", position: "absolute" }}
              />
            </div>
            <button
              className="absolute right-0  z-10 h-full rounded-r-xl"
              onClick={handleNext}
            >
              <Image
                src={"/icon/chev_right_white.svg"}
                alt={"chevIcon"}
                width={48}
                height={48}
              />
            </button>
          </section>
          <article className="flex flex-col  tablet:w-[480px] gap-2 h-full justify-center">
            <div className="text-3xl tablet:text-5xl font-bold font-winky">
              {name}
            </div>
            <div className="tablet:text-xl font-semibold text-gray-500">
              {descriptions[0]}
            </div>
            <div className="tablet:text-xl font-semibold text-gray-500">
              {descriptions[1]}
            </div>
            <div className="tablet:text-xl font-semibold text-gray-500">
              {descriptions[2]}
            </div>
            <div className="tablet:text-xl font-semibold text-gray-500">
              {descriptions[3]}
            </div>
            <div className="tablet:text-xl font-semibold text-gray-500">
              {descriptions[4]}
            </div>
          </article>
        </div>
      ) : (
        <div className="flex flex-col-reverse gap-10 tablet:flex-row desktop:flex-row  px-4 desktop:w-[1048px] justify-between ">
          <article className="flex flex-col tablet:w-[480px] gap-2 h-full justify-center">
            <div className="text-3xl tablet:text-5xl font-bold font-winky">
              {name}
            </div>
            <div className="tablet:text-xl font-semibold text-gray-500">
              {descriptions[0]}
            </div>
            <div className="tablet:text-xl font-semibold text-gray-500">
              {descriptions[1]}
            </div>
            <div className="tablet:text-xl font-semibold text-gray-500">
              {descriptions[2]}
            </div>
            <div className="tablet:text-xl font-semibold text-gray-500">
              {descriptions[3]}
            </div>
            <div className="tablet:text-xl font-semibold text-gray-500">
              {descriptions[4]}
            </div>
          </article>
          <section className="relative flex flex-row justify-center items-center tablet:w-[480px] h-[18rem] rounded-xl shadow-2xl ">
            <button
              className="absolute left-0 z-10 h-full rounded-l-xl"
              onClick={handlePrev}
            >
              <Image
                src={"/icon/chev_left_white.svg"}
                alt={"chevIcon"}
                width={48}
                height={48}
              />
            </button>
            <div>
              <Image
                className="rounded-xl bg-transparent"
                src={images[imageIndex]}
                alt={"PlaneImages"}
                fill
                style={{ objectFit: "cover", position: "absolute" }}
              />
            </div>
            <button
              className="absolute right-0  z-10 h-full rounded-r-xl"
              onClick={handleNext}
            >
              <Image
                src={"/icon/chev_right_white.svg"}
                alt={"chevIcon"}
                width={48}
                height={48}
              />
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
