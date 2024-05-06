import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminGetUser,
  adminMakeUserAdmin,
  adminUpdateUser,
  adminDeleteUser,
} from "../../redux/features/user/userThunks";
import { useStateContext } from "../../context/ContextProvider";
import { CgProfile } from "react-icons/cg";
import { Header } from "../../components/user";
import { useNavigate, useParams } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import { AiOutlineUserDelete } from "react-icons/ai";
function AdminUserDetails() {
  const { id } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [full_name, setFull_name] = useState("");
  const [email, setEmail] = useState("");
  const [birth_date, setBirth_date] = useState("");
  const { setCurrentColor, setCurrentMode, currentColor } = useStateContext();
  const fetchUser = async () => {
    try {
      const fetcheduser = await dispatch(adminGetUser(id));
      setUser(fetcheduser);
      setFull_name(fetcheduser.full_name);
      setEmail(fetcheduser.email);
      setBirth_date(fetcheduser.birth_date);
    } catch (error) {
      console.error("Error fetching user:", error.message);
    }
  };
  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }

    fetchUser(id);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(adminUpdateUser(id, email, full_name, birth_date)).then(() => {
      fetchUser(id);
    });
  };
  return (
    <div className="p-10">
      <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-10 rounded-2xl w-full">
        <div className="flex flex-row justify-between items-center mt-6 border-color border-b-1">
          <Header title={`User ID: ${id}`} category="User details" />
          <div className="flex gap-10">
            {user?.is_admin === false && (
              <button
                onClick={() => {
                  dispatch(adminMakeUserAdmin(id).then(() => fetchUser(id)));
                }}
              >
                <MdAdminPanelSettings size={50} color={currentColor} />
              </button>
            )}
            {currentUser?.id.toString() !== id && (
              <button
                onClick={() =>
                  dispatch(adminDeleteUser(id)).then(() =>
                    navigate("/admin-users")
                  )
                }
              >
                <AiOutlineUserDelete size={50} color={currentColor} />
              </button>
            )}
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
                full_name === user?.full_name &&
                email === user?.email &&
                birth_date === user?.birth_date
              }
              className="font-semibold text-xl dark:text-gray-200 p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Update User Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminUserDetails;
