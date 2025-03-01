import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "../LayOut/Header";
// import Footer from "../LayOut/Footer";

const Layout = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <div className="App">
      {token && <Header className="mb-5" />}{" "}
      {/* Show header only when logged in */}
      <div className="app-container">
        <div className="main-content">
          <Outlet />
        </div>
      </div>
      {token && <Footer />} Show footer only when logged in
    </div>
  );
};

export default Layout;
