import Image from "next/image";

import cloudy from "@/assets/images/cloudy.png";

export const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Image src={cloudy.src} width={128} height={128} alt="cloudy-icon" />
      <h1 className="text-3xl font-bold text-center mb-8">Simple Clima</h1>
    </div>
  );
};
