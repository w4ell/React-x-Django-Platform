import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  logoutUser,
  passwordResetConfirm,
} from "../../redux/features/user/userThunks";
import { useParams } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PasswordResetConfirm = () => {
  const [new_password, setNew_password] = useState("");
  const [re_new_password, setRe_new_password] = useState("");
  const [visible, setVisible] = useState(false);
  const { uid, token } = useParams();
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
              dispatch(
                passwordResetConfirm(uid, token, new_password, re_new_password)
              ).then(() => {
                dispatch(logoutUser());
              });
            }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="new_password"
                  autoComplete="current-password"
                  required
                  value={new_password}
                  onChange={(e) => setNew_password(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-sky-200"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirmer ot de passe
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="re_new_password"
                  autoComplete="current-password"
                  required
                  value={re_new_password}
                  onChange={(e) => setRe_new_password(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            {new_password !== re_new_password && (
              <p className="text-red-500 text-sm">Passwords do not match</p>
            )}
            <div>
              <button
                type="submit"
                disabled={new_password !== re_new_password}
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetConfirm;
