import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import Navbar from "../elements/Navbar";
import Sidebar from "../elements/Sidebar";
import Footer from "../elements/Footer";

function ProtectedLayout() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated == null)
    return <div className="text-center p-8 text-gray-500">Loading...</div>;
  return isAuthenticated ? (
    <div className="min-h-screen flex flex-col gap-3 justify-between">
      <div className="flex ">
        <Navbar />
        <Sidebar />
        <Outlet />
      </div>
      <Footer />
    </div>
  ) : (
    <Navigate to="/" replace />
  );
}

export default ProtectedLayout;
