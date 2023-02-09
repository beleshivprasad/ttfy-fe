import Dashboard from "../pages/Dashboard";
import Login from "../pages/User/Login";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import UserList from "../pages/User/UserList";
import User from "../pages/User/User";
import Register from "../pages/User/Register";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/users",
    element: <UserList />,
  },
  {
    path: "/users/:id",
    element: <User />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
