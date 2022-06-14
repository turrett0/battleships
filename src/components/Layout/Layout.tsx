import {Outlet, useLocation} from "react-router-dom";
import {requireServerSessionPing} from "../../api/socketIO/actions";
import Header from "../Header/Header";

const Layout = () => {
  const params = useLocation();
  console.log(params.pathname.includes("/id"));
  if (params.pathname !== "/id" && params.pathname.includes("/id")) {
    const sessionID = params.pathname.split("id")[1];
    requireServerSessionPing(sessionID);
    window.history.replaceState(null, "", "/");
  }
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
