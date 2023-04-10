import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import TextInput from "../components/Inputs/TextInput";
import { Link } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (login && email && password) {
      const res = await login(email, password);
      if (res && res.status === 400) {
        setError("Incorrect username or password.")
      } else {
        setError("Something went wrong. Please try again.")
      }
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-16">
      {error && (
        <div className="alert alert-red w-[20rem]">
          <span>❗️</span>
          <p className="w-full">{error}</p>
        </div>
      )}
      <h1 className="text-5xl font-bold">Login</h1>
      <form onSubmit={loginUser} className="flex flex-col gap-2 items-center">
        <div className="flex flex-col gap-3 relative w-[20rem] mb-8">
          <TextInput label="Email" value={email} setValue={setEmail} required />
          <TextInput label="Password" value={password} setValue={setPassword} type="password" required />
        </div>
        <button
          type="submit"
          className="btn btn-green w-fit self-center"
        >
          Login
        </button>
        <p className="text-sm">or <Link to="/register" className="hover:underline text-emerald-500">create a new account</Link></p>
      </form>
    </div>
  );
}

export default Login;
