import { Provider, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider, Navigate, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import RecorderPage from "./routes/recorder";
import LoginFormPage from "./routes/login";
import CreateSessionPage from "./routes/create-session";
import { useState } from "react";

const PrivateRoute = ({ element: Element, isAuthenticated, ...rest }) => {
  return isAuthenticated ? (
    <Element />
  ) : (
    <Navigate to="/" replace />
  );
}

function App() {
  const token = useSelector((state) => state.auth.token);
  

  const router = createBrowserRouter([
    { path: "/", element: <LoginFormPage /> },
    { path: "recorder", element: <PrivateRoute element={RecorderPage} isAuthenticated={token} /> },
  ]);


  return (
    <RouterProvider router={router}/>
  );
}

export default App;
