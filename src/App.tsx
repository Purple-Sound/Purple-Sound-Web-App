import { Provider, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider, Navigate, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import RecorderPage from "./routes/recorder";
import LoginFormPage from "./routes/login";
import { useState } from "react";

const PrivateRoute: React.FC<{element: React.ReactElement; isAuthenticated: boolean}> = ({ element, isAuthenticated}) => {
  return isAuthenticated ? element : <Navigate to="/" replace />;
}

function App() {
  const token = useSelector((state: any) => state.auth.token);
  console.log('token', token);
  

  const router = createBrowserRouter([
    { path: "/", element: <LoginFormPage /> },
    { path: "recorder", element: <PrivateRoute element={<RecorderPage/>} isAuthenticated={token} /> },
  ]);


  return (
    <RouterProvider router={router}/>
  );
}

export default App;
