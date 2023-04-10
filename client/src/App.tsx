import React, { useEffect } from "react";
import Homepage from "./pages/Homepage";
import useAuth from "./hooks/useAuth";
import Login from "./pages/Login";
import { useNavigate, useParams } from "react-router-dom";

function App() {
  const { token } = useAuth();
  const { notebook } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!notebook) { // no notebook specified (happens on first load)
      const firstNotebook = "abc"; // get user's first notebook
      navigate(`/${firstNotebook}`);
    }
  }, []);

  return <div className="App">{!token ? <Login /> : <Homepage />}</div>;
}

export default App;
