import React from "react";
import Link from "next/link";

function HeroSection() {
  return (
    <div className="flex flex-col mx-16 items-center mt-[100px] gap-6">
      <span className="font-bold text-3xl text-center">
        Take charge of your day like a true{" "}
        <span className="text-customBlue">King 👑</span>
      </span>

      <div className="text-center text-sm sm:w-[430px] w-[370px] space-y-3">
        <p>Stop feeling scattered and start feeling unstoppable.</p>
        <p>Our habit tracker is built to help you stay on top of every goal.</p>
        <p>Break free from overwhelm, build momentum, and turn your everyday habits into real progress, one win at a time.</p>
      </div>

      <Link href="/sign-in">
        <button
          className="block text-sm font-light rounded-lg px-9 py-3 text-white transition bg-customBlue focus:outline-none hover:bg-customBlue border border-customBlue"
          type="button"
        >
          {`Let's get started`}
        </button>
      </Link>
    </div>
  );
}

export default HeroSection;
