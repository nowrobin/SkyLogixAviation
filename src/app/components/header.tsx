
// import Image from "next/image";
// import { useRouter } from "next/navigation";


// export default function Header() {
//   const router = useRouter()
//   // const pathname = usePathname()
//   return (
//     <section className="fixed z-30 bg-white flex flex-row justify-between items-center w-full px-3 p-2">
//       <div onClick={() => router.push('/')}  >
//         <Image src={"/fullLogo.png"} alt={""} width={240} height={40} />
//       </div>
//       <div className="flex-row  hidden tablet:flex desktop:flex gap-10 mr-10 justify-center items-center text-gray-600 font-semibold cursor-default ">
//         <div className="hover:text-[#FFBD59]" onClick={handleTopClick}>Home</div>
//         <div className="hover:text-[#FFBD59]" onClick={scrollToSection}>Aircrafts</div>
//         <div className="hover:text-[#FFBD59]" onClick={scrollToSection}>Our Crew</div>
//         {/* <button disabled>Become A Pilot</button> */}
//         {/* <div>About Us</div> */}
//         <button className="py-2 bg-[#FFBD59] text-black px-3 rounded-xl" onClick={() => router.push('/Contact')} >Contact Us</button>
//       </div>
//     </section>
//   )
// }