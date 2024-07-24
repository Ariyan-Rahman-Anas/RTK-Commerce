import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSignOutMutation } from "../app/api/authApi";
import { useDispatch } from "react-redux";
import { addNotification } from "../features/notifications/notificationSlice";
import { IoMenuOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [menu, setMenu] = useState(false);
  const [signOut, { error, isError, isLoading }] = useSignOutMutation();
  const gettingDataFromLS = localStorage.getItem("userData");
  const userData = JSON.parse(gettingDataFromLS);

  const toggleMenu = () => {
    setMenu(!menu)
  }

  const hideMenu = () => {
    setMenu(!menu)
  }

  const handleLogout = async () => {
    try {
      await signOut().unwrap();
      hideMenu()
      localStorage.removeItem("userData");
      dispatch(addNotification({
        id: Date.now(),
        message: "Logged out Successful",
        type: "success",
        duration: 3000
      }))
      navigate("/log-in");
    } catch (error) {
      dispatch(addNotification({
        id: Date.now(),
        message: "Cannot Log out",
        type: "error",
        duration: 3000
      }))
    }
  };

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between p-2 sticky top-0 w-full z-[1000] shadow-md bg-gray-200">
      <div className="left flex items-center justify-between w-full md:w-fit ">
        <Link to={"/"} className="text-2xl font-semibold">
          <span className="text-primary">RTK</span>-Commerce
        </Link>
        <div className="md:hidden text-3xl ">
        {menu ? <RxCross2 onClick={toggleMenu} /> : <IoMenuOutline onClick={toggleMenu}  /> }
      </div>
      </div>
      <div className={`middle absolute md:static ${menu ? " left-0 top-[3rem]  py-10 md:py-0 right-0 text-white md:text-black bg-black md:bg-transparent rounded-md min-w-full md:min-w-fit min-h-screen md:min-h-0" : "-left-[50rem]" } duration-500 z-10 `}>
        <ul className="flex flex-col md:flex-row items-center gap-4">
          <li onClick={hideMenu}>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive && location.pathname === "/"
                  ? " text-primary border-b-2 border-b-primary rounded-sm duration-500 "
                  : "border-b-2 border-b-transparent duration-500 "
              }
            >
              Home
            </NavLink>
          </li>
          <li onClick={hideMenu}>
            <NavLink
              to={"/products"}
              className={({ isActive }) =>
                isActive && location.pathname === "/products"
                  ? "text-primary border-b-2 border-b-primary rounded-sm duration-500 "
                  : "border-b-2 border-b-transparent duration-500 "
              }
            >
              Products
            </NavLink>
          </li>
          <li onClick={hideMenu}>
            <NavLink
              to={"/add-product"}
              className={({ isActive }) =>
                isActive && location.pathname === "/add-product"
                  ? "text-primary border-b-2 border-b-primary rounded-sm duration-500 "
                  : "border-b-2 border-b-transparent duration-500 "
              }
            >
              Add Product
            </NavLink>
          </li>
          <li onClick={hideMenu}>
            <NavLink
              to={"/my-products"}
              className={({ isActive }) =>
                isActive && location.pathname === "/my-products"
                  ? "text-primary border-b-2 border-b-primary rounded-sm duration-500 "
                  : "border-b-2 border-b-transparent duration-500 "
              }
            >
              My Products
            </NavLink>
          </li>
        </ul>
        <div className="md:hidden text-center mt-4 ">
        {userData ? (
          <button onClick={handleLogout} className="btn-2">
            Sign out
          </button>
        ) : (
          <Link onClick={hideMenu} to={"/log-in"} className="btn-2">
            Sign in
          </Link>
        )}
      </div>
      </div>
      <div className="right hidden md:block ">
        {userData ? (
          <button onClick={handleLogout} className="btn-2">
            Sign out
          </button>
        ) : (
          <Link to={"/log-in"} className="btn-2">
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}