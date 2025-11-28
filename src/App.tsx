import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from "./Layout";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import WEngines from "./pages/WEngines";
import Equipment from "./pages/Equipment";

// Set basename to match your GitHub Pages repo path
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
      ],
    },
  ],
  {
    basename: "/zzz-showcase", // <-- add this
  }
);

export default function App() {
  return <RouterProvider router={router} />;
}
