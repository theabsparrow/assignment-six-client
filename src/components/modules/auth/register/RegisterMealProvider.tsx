import { Dispatch, SetStateAction } from "react";

const RegisterMealProvider = ({
  setRegisteredRole,
}: {
  setRegisteredRole: Dispatch<SetStateAction<string | null>>;
}) => {
  return (
    <div>
      <button onClick={() => setRegisteredRole("")}>
        back to previous page
      </button>
    </div>
  );
};

export default RegisterMealProvider;
