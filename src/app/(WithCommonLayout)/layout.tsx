import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { getMyProfle } from "@/services/profileService";
import { Suspense } from "react";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const { data } = await getMyProfle();
  return (
    <div>
      <Suspense fallback={<div>Loading navbar...</div>}>
        <Navbar
          name={data?.userdata?.name}
          profileImage={data?.userdata?.profileImage}
        />
      </Suspense>

      <main className="min-h-screen ">{children}</main>
      <Footer />
    </div>
  );
};

export default CommonLayout;
