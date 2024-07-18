import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSignOutMutation } from "../app/api/authApi";
import { useDispatch } from "react-redux";
import { addNotification } from "../features/notifications/notificationSlice";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [signOut, { error, isError, isLoading }] = useSignOutMutation();

  const gettingDataFromLS = localStorage.getItem("userData");
  const userData = JSON.parse(gettingDataFromLS);

  const handleLogout = async () => {
    try {
      await signOut().unwrap();
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
    <nav className="flex flex-col md:flex-row items-center justify-between py-2">
      <div className="left">
        <Link to={"/"} className="text-2xl font-semibold">
          <span className="text-primary">RTK</span>-Commerce
        </Link>
      </div>
      <div className="middle">
        <ul className="flex items-center gap-4">
          <li>
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
          <li>
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
          <li>
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
          <li>
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
      </div>
      <div className="right">
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