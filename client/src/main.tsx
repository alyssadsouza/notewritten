import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App'
import Login from './pages/Login';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage';
import TextEditor from './components/TextEditor';
import './index.css'
import { AuthProvider } from './hooks/useAuth';
import { NotebooksProvider } from './hooks/useNotebooks';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:notebook_id",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/:notebook_id/:page_id",
        element: <TextEditor />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <NotebooksProvider>
		<RouterProvider router={router} />
	  </NotebooksProvider>
    </AuthProvider>
  </React.StrictMode>,
)
