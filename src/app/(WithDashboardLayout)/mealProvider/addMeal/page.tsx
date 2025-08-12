import CreateMeal from "@/components/modules/dashboard/mealProvider/createMeal/CreateMeal";
import { getMyProfle } from "@/services/profileService";

const AddMeal = async () => {
  const { data } = await getMyProfle();
  const userdata = data?.userdata;
  const hasKitchen = userdata?.hasKitchen;
  return (
    <div className="min-h-screen mx-auto">
      <CreateMeal hasKitchen={hasKitchen} />
    </div>
  );
};

export default AddMeal;
