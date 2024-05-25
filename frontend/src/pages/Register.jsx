import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/features/user/userThunks";
import { Navbar, Footer } from "../components/Home";

function Register() {
  const error = useSelector((state) => state.user.error);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const isAdminAuthenticated = useSelector(
    (state) => state.user.isAdminAuthenticated
  );
  const navigate = useNavigate();
  const [full_name, setFull_name] = useState("");
  const [email, setEmail] = useState("");
  const [birth_date, setBirth_date] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRe_password] = useState("");
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerUser(full_name, email, birth_date, password, re_password));
    setSubmit(true);
  };
  useEffect(() => {
    if (isAdminAuthenticated) {
      navigate("/admin-dashboard");
    } else if (isAuthenticated) {
      navigate("/insert-data");
    }
  }, []);
  return (
    <div className="body flex flex-col w-full h-full min-h-screen">
      <div className="flex-none">
        <Navbar />
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mt-10">
          <h1 className="text-4xl font-bold mb-5 text-[#F25E3D]">
            Créer un compte
          </h1>
        </div>
      </div>
      <div className="grow w-full sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <span className="block text-sm font-medium text-gray-700">
                Nom et Prénom
              </span>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={full_name}
                  onChange={(e) => setFull_name(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-700">
                Adresse e-mail
              </span>
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
              <span className="block text-sm font-medium text-gray-700">
                Date de naissance
              </span>
              <div className="mt-1">
                <input
                  type="date"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  name="birth_date"
                  value={birth_date}
                  required
                  onChange={(e) => setBirth_date(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirmer ot de passe
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="re_password"
                  autoComplete="current-password"
                  required
                  value={re_password}
                  onChange={(e) => setRe_password(e.target.value)}
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
            {password !== re_password && (
              <p className="text-red-500 text-sm">Passwords do not match</p>
            )}

            <button
              type="submit"
              disabled={password !== re_password}
              className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-[#F25E3D] hover:bg-[#f07c62] disabled:bg-sky-200"
            >
              S'inscrire
            </button>
            {error && show === false && (
              <div className="text-red-500  text-sm">{error}</div>
            )}
            {show && (
              <p className="text-green-600 text-sm">An email has been sent!</p>
            )}
            <div className="w-full">
              <p>
                Vous avez déjà un compte?
                <Link to="/login" className="text-[#F25E3D] pl-2">
                  Se connecter
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="flex-none mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default Register;
