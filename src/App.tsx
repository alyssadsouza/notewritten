import React from "react";
import Homepage from "./pages/Homepage";
import useAuth from "./hooks/useAuth";
import Login from "./pages/Login";

function App() {
  const { user } = useAuth();
  return <div className="App">{!user ? <Login /> : <Homepage />}</div>;
}

export default App;
