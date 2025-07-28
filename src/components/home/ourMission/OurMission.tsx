import Image from "next/image";
import MissionContent from "./MissionContent";

const OurMission = () => {
  return (
    <section className="md:px-24 px-5 mb-10 flex justify-between">
      <div className="relative">
        <Image
          src="https://i.ibb.co/CKzRPSVm/nuddles-photo.webp"
          height={1000}
          width={1000}
          alt="mission-image"
          className="w-[32vw] h-[88vh]"
        />
        <Image
          src="https://i.ibb.co/TqhXFhkV/customer-2.webp"
          height={1000}
          width={1000}
          alt="customer-image"
          className="w-[13vw] h-[28vh] border-8 border-white absolute bottom-10 -right-20 hidden md:flex"
        />
      </div>
      <MissionContent />
    </section>
  );
};

export default OurMission;
