import React from "react";
import Image from "next/image";

const Page = () => {
  return (
    <main className="w-full h-screen">
      <div className="relative w-full h-full">
        {/* Background Image */}
        <Image
          src="/location.png"
          alt="Location"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>
    </main>
  );
};

export default Page;
