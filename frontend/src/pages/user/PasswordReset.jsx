import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { passwordReset } from "../../redux/features/user/userThunks";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col justify-center w-full h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h1 className="text-4xl font-bold mb-5 dark:text-white">
          Password Reset
        </h1>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(passwordReset(email));
              setShow(true);
            }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Adresse e-mail
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700"
              >
                Envoyer
              </button>
            </div>
            {show && (
              <p className="text-green-600 text-sm">An email has been sent</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
