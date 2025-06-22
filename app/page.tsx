import HeroSection from "./mainPageComponents/HeroSection";
import Navbar from "./mainPageComponents/Navbar";
import Image from "next/image";
import { useCallback } from "react";
export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <div className="flex w-full justify-center mt-20">
        <Image
          src={"/app.svg"}
          alt="dashboard"
          width={400}
          height={400}
          style={{ maxWidth: "400px", height: "auto" }}
        />
      </div>
    </div>
  );
}
