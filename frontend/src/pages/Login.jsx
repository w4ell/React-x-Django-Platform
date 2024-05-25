import { React, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, loadUser } from "../redux/features/user/userThunks";
import { useNavigate } from "react-router-dom";
import { Navbar, Footer } from "../components/Home";

const Login = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const isAdminAuthenticated = useSelector(
    (state) => state.user.isAdminAuthenticated
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const loading = useSelector((state) => state.user.loading);
  const err = useSelector((state) => state.user.error);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (email && password) {
      setError(err);
    }
  }, [err]);
  useEffect(() => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      dispatch(loadUser()).then(() => {
        if (isAuthenticated) {
          navigate("/insert-data");
        } else if (isAdminAuthenticated) {
          navigate("/admin-dashboard");
        }
      });
    }
  }, [isAuthenticated, isAdminAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  return (
    <div className="body w-full h-full min-h-screen flex flex-col">
      <div className="flex-none">
        <Navbar />
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mt-20">
          <h1 className="text-4xl font-bold mb-5 text-[#F25E3D]">Connexion</h1>
        </div>
      </div>
      <div className="grow sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
            {error && <div className="text-red-500  text-sm">{error}</div>}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-[#F25E3D] hover:bg-[#f07c62]"
              >
                Se connecter
              </button>
            </div>
            <div className="w-full flex flex-col">
              <p>
                Mot de passe oublie?
                <Link to={`/password-reset`} className="text-[#F25E3D] pl-2">
                  Reinitialiser
                </Link>
              </p>
              <p>
                Vous n'avez pas de compte ?
                <Link to={`/register`} className="text-[#F25E3D] pl-2">
                  S'inscrire
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
};

export default Login;
