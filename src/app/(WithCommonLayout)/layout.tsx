import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { getMyProfle } from "@/services/profileService";

export type TMyProfileQUery =
  | "navbar"
  | "profile"
  | "settings"
  | "kitchen"
  | "plan";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const query: Record<string, TMyProfileQUery | undefined> = {};
  query.for = "navbar";
  const result = await getMyProfle(query);

  const data = result?.data || null;
  return (
    <div>
      <Navbar user={data} />
      <main className="min-h-screen ">{children}</main>
      <Footer />
    </div>
  );
};

export default CommonLayout;
