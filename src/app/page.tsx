import InputCard from "@/components/input/input";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] sm:grid sm:grid-cols-1 sm:items-center sm:justify-center">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-4 items-center justify-items-center 
          md:flex-col-reverse md:max-w-[729px] md:min-w-[600px]">
          
          <InputCard />
          
          <Image
            className=""
            src="/images/image.jpg"
            alt="Skipe Hire Image"
            width={480}
            height={38}
            priority
          />
        </div>
      </main>
      <footer className="row-start-3 flex gap-[2px] flex-wrap items-center justify-center">
        <small className="text">Version 1.0.31</small>
      </footer>
    </div>
  );
}
