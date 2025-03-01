import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { token } = useSelector((state) => state.auth);

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
