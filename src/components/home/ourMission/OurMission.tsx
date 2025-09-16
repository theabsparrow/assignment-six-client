import Image from "next/image";
import MissionContent from "./MissionContent";

const OurMission = () => {
  return (
    <section className="w-full lg:px-16 px-4 flex flex-col lg:flex-row justify-between lg:items-center gap-4 lg:gap-0">
      <div className="relative w-full">
        <Image
          src="https://i.ibb.co/CKzRPSVm/nuddles-photo.webp"
          height={1000}
          width={1000}
          alt="mission-image"
          className="lg:w-[37vw] lg:h-[640px]"
        />
        <Image
          src="https://i.ibb.co/TqhXFhkV/customer-2.webp"
          height={1000}
          width={1000}
          alt="customer-image"
          className="w-[13vw] h-[28vh] border-8 border-white absolute bottom-10 right-10 hidden md:flex"
        />
      </div>
      <MissionContent />
    </section>
  );
};

export default OurMission;
