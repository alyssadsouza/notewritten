import React, { useEffect } from "react";
import Homepage from "./pages/Homepage";
import useAuth from "./hooks/useAuth";
import Login from "./pages/Login";
import { useNavigate, useParams } from "react-router-dom";
import useNotebooks from "./hooks/useNotebooks";
import Loading from "./pages/Loading";

function App() {
  const { token } = useAuth();
  const { fetchNotebooks, notebooks, loading } = useNotebooks();
  const { notebook_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && !notebooks.length) {
      fetchNotebooks(token);
    }
  }, []);

  useEffect(() => {
    if (!notebook_id) {
      // no notebook specified (happens on first load)
      const firstNotebook = notebooks.at(0)?.notebook.id; // get user's first notebook
      if (firstNotebook) navigate(`/${firstNotebook}`);
    }
  }, [notebooks]);

  return (
    <div className="App">
      {!token ? <Login /> : loading ? <Loading /> : <Homepage />}
    </div>
  );
}

export default App;
