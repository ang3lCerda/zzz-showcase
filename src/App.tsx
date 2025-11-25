import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from "./Layout";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import WEngines from "./pages/WEngines";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "characters", element: <Characters /> },
      { path: "w-engines", element: <WEngines /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
