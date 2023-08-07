import User from "../auth/User";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";

const AppLayout = () => {
  if (!User.loggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <Header firstname={User.firstname} isLoggedIn={User.loggedIn} />
      <Outlet />
    </div>
  );
};

export default AppLayout;
