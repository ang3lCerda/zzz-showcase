import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Layout from "./Layout";
import Home from "./pages/Home";
import Character from "./pages/CharacterDetails";
import WEngines from "./pages/WeaponsDetails";
import Equipment from "./pages/Equipment";
import Login from "./pages/Login";
import DiscDetailPage from "./pages/DiscsDetails";
import WeaponPage from "./pages/Weapons";
import Characters from "./pages/Characters";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "character/:id", element: <Character /> },
        { path: "characters", element: <Characters /> },
        { path: "weapons", element: <WeaponPage /> },
        { path: "weapon/:id", element: <WEngines /> },
        { path: "disc", element: <Equipment /> },
        { path: "disc/:id", element: <DiscDetailPage /> },
        { path: "login", element: <Login /> },   
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
