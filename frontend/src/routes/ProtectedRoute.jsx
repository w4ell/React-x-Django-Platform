import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const loading = useSelector((state) => state.user.loading);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  if (loading === false && isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
