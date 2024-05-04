import { React } from "react";
import { MdOutlineMarkEmailRead } from "react-icons/md";

const AccountActivation = () => {
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div className="space-y-6 flex flex-col items-center justify-center">
          <p>Un email a été envoye pour activer votre compte</p>
          <span className="text-green-600 border-[10px] rounded-full p-8 border-green-600">
            <MdOutlineMarkEmailRead size={100} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccountActivation;
