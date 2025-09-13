import { TMyProfileQUery } from "@/app/(WithCommonLayout)/layout";
import CreateMeal from "@/components/modules/dashboard/mealProvider/createMeal/CreateMeal";
import { getMyProfle } from "@/services/profileService";

const AddMeal = async () => {
  const query: Record<string, TMyProfileQUery | undefined> = {};
  query.for = "kitchen";
  const result = await getMyProfle(query);
  const data = result?.data || null;
  return (
    <>
      <section className="min-h-screen mx-auto">
        <CreateMeal hasKitchen={data?.hasKitchen} />
      </section>
    </>
  );
};

export default AddMeal;
