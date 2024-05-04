import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  passwordReset,
  updateUser,
} from "../../redux/features/user/userThunks";
import { useStateContext } from "../../context/ContextProvider";
import { CgProfile } from "react-icons/cg";
import { Header } from "../../components/user";
function ProfileSettings() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [full_name, setFull_name] = useState(user?.full_name);
  const [email, setEmail] = useState(user?.email);
  const [birth_date, setBirth_date] = useState(user?.birth_date);
  const [show, setShow] = useState(false);
  const { setCurrentColor, setCurrentMode, currentColor } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUser(email, full_name, birth_date));
  };
  return (
    <div className="p-10">
      <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-10 rounded-2xl w-full">
        <div className="flex gap-10 items-center mt-6 border-color border-b-1 pb-6">
          <CgProfile size={100} color={currentColor} />
          <div>
            <Header title="Profile" category="Settings" />
          </div>
        </div>
        <div className="flex flex-col gap-20 items-center mt-6">
          <form
            className="w-full flex flex-col gap-3 justify-center"
            onSubmit={handleSubmit}
          >
            <p className="font-semibold text-xl dark:text-gray-200">
              Full Name:
            </p>
            <input
              type="text"
              name="full_name"
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              value={full_name}
              onChange={(e) => setFull_name(e.target.value)}
            />
            <p className="font-semibold text-xl dark:text-gray-200">Email:</p>
            <input
              type="email"
              name="email"
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="font-semibold text-xl dark:text-gray-200">
              Birth Date:
            </p>
            <input
              type="date"
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              name="birth_date"
              value={birth_date}
              onChange={(e) => setBirth_date(e.target.value)}
            />
            <button
              type="submit"
              style={{ backgroundColor: currentColor }}
              disabled={
                email === user.email &&
                full_name === user.full_name &&
                birth_date === user.birth_date
              }
              className="font-semibold text-xl dark:text-gray-200 p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Update Profile
            </button>
          </form>
          <div>
            <p className="font-semibold text-xl dark:text-gray-200">
              Forgot Password?
            </p>
            <button
              onClick={() => {
                dispatch(passwordReset(user.email));
                setShow(true);
              }}
              style={{ backgroundColor: currentColor }}
              className="font-semibold text-xl dark:text-gray-200 p-2 rounded-lg"
            >
              Reset Password
            </button>
            {show && (
              <p className="text-green-600 text-sm">An email has been sent</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
