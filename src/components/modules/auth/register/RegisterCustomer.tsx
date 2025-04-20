import { Dispatch, SetStateAction } from "react";

const RegisterCustomer = ({
  setRegisteredRole,
}: {
  setRegisteredRole: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div>
      <button onClick={() => setRegisteredRole("")}>
        back to previous page
      </button>
    </div>
  );
};

export default RegisterCustomer;
