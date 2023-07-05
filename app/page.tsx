import NavBar from "@/components/navBar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="text-white">
      <NavBar />
      <section className="h-[364px] phone:h-[219px] phone:px-6 phone:pt-8 pt-20 px-10 relative mt-8 rounded-2xl bg-[#950101]">
        <h2 className="font-bold phone:text-xl phone:ml-0 phone:mb-2  mb-[6px] text-[40px] -ml-[2px] leading-[150%]">
          Upcoming Stars
          <br />
          Upload To Soundly
        </h2>
        <p className="text-[#CCCCCC] phone:mb-7 mb-[51px] text-base">
          Start Uploading Now
        </p>
        <Link
          className="bg-button rounded-full  text-black font-bold inline-block text-base px-8 py-3"
          href={"/upload"}
        >
          Upload
        </Link>
        <Image
          className="absolute phone:w-[148px] phone:h-[220px]  bottom-0 right-0 w-[247px] h-[369px]"
          alt="Artist Photo"
          height={369}
          width={247}
          quality={100}
          src={"/landing-photo.png"}
        />
      </section>
    </main>
  );
}
