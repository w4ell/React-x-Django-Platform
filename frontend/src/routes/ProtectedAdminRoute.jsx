import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const loading = useSelector((state) => state.user.loading);
  const isAdminAuthenticated = useSelector(
    (state) => state.user.isAdminAuthenticated
  );
  if (loading === false && isAdminAuthenticated === false) {
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
};

export default ProtectedAdminRoute;
