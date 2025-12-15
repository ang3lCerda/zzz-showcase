import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Layout from "./Layout";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import WEngines from "./pages/WEngines";
import Equipment from "./pages/Equipment";
import Login from "./pages/Login";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "characters", element: <Characters /> },
        { path: "w-engines", element: <WEngines /> },
        { path: "equipment", element: <Equipment /> },
        { path: "login", element: <Login /> },   // ✅ login route
        { path: "*", element: <Navigate to="/" replace /> },
      ],
    },
  ],
  {
    basename: "/zzz-showcase",
  }
);


export default function App() {
  return <RouterProvider router={router} />;
}
