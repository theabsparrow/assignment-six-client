import { TMyProfileQUery } from "@/app/(WithCommonLayout)/layout";
import CreateMyPlan from "@/components/modules/dashboard/customer/createPlan/CreateMyPlan";
import { getMyProfle } from "@/services/profileService";
import Link from "next/link";

const CreatePlan = async () => {
  const query: Record<string, TMyProfileQUery | undefined> = {};
  query.for = "plan";
  const result = await getMyProfle(query);
  const data = result?.data || null;
  const { user } = data;

  return (
    <section className="min-h-screen mx-auto">
      {user?.verifiedWithEmail ? (
        <CreateMyPlan />
      ) : (
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-primary dark:text-secondary">
            You didn`t verified your email yet`
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Go to settings to verify your email right now
          </p>
          <Link
            href="/settings"
            className="inline-block bg-secondary hover:bg-primary text-primary border border-primary hover:text-white font-semibold py-2 px-6 rounded-full transition-all duration-500"
          >
            Settings
          </Link>
        </div>
      )}
    </section>
  );
};

export default CreatePlan;
