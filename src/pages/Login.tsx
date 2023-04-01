import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import TextInput from "../components/Inputs/TextInput";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (login && email && password) {
      login(email, password);
    }
  };
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-16">
      <h1 className="text-6xl font-bold">Login</h1>
      <form onSubmit={loginUser} className="flex flex-col gap-8">
        <div className="flex flex-col gap-3 relative w-[20vw]">
          <TextInput label="Email" value={email} setValue={setEmail} required />
          <TextInput label="Password" value={password} setValue={setPassword} type="password" required />
        </div>
        <button
          type="submit"
          className="px-5 py-2 w-fit self-center rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-all"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
