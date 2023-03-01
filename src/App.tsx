import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import RecorderPage from "./pages/recorder";
import LoginFormPage from "./pages/login";

const router = createBrowserRouter([
  { path: "/", element: <LoginFormPage /> },
  { path: "recorder", element: <RecorderPage /> },
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
