import React, { useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import TextEditor from "./components/TextEditor";
import Homepage from "./pages/Homepage";
import useAuth from "./hooks/useAuth";
import useNotebooks from "./hooks/useNotebooks";
import Loading from "./pages/Loading";
import NoPageOpen from "./components/Homepage/NoPageOpen";
import NoNotebookOpen from "./components/Homepage/NoNotebookOpen";

function App() {
  const { token } = useAuth();
  const { fetchNotebooks, notebooks, loading } = useNotebooks();

  useEffect(() => {
    if (token && !notebooks.length) {
      fetchNotebooks(token);
    }
  }, []);

  const authRouter = createBrowserRouter([
    {
      path: "*",
      element: <Navigate to="/login" replace />,
    },
    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/register",
      element: <Register />,
    },
  ]);

  const router = createBrowserRouter([
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
    {
      path: "/",
      element: <Homepage />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <NoNotebookOpen />,
        },
        {
          path: "/:notebook_id",
          element: <NoPageOpen />,
        },
        {
          path: "/:notebook_id/:page_id",
          element: <TextEditor />,
        },
      ],
    },
  ]);

  return (
    <>
      {!token ? (
        <RouterProvider router={authRouter} />
      ) : loading ? (
        <Loading />
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
}

export default App;
