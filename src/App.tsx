import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Layout from "./Layout";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import WEngines from "./pages/WEngines";
import Equipment from "./pages/Equipment";

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
        // Catch-all route for unmatched URLs
        { path: "*", element: <Navigate to="/" replace /> },
      ],
    },
  ],
  {
    basename: "/zzz-showcase", // Your GitHub Pages repo path
  }
);

export default function App() {
  return <RouterProvider router={router} />;
}
