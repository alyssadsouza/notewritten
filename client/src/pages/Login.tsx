import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import TextInput from "../components/Inputs/TextInput";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Spinner } from "../assets/spinner.svg";
import shapes from "../assets/shapes.jpg";

function Login() {
  const navigate = useNavigate();
  const { login, error, loading, token } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="w-screen h-screen grid grid-cols-2">
      <div>
        <img src={shapes} className="object-cover h-full w-full" />
      </div>
      <div className="flex flex-col items-center justify-center gap-16">
		<Logo className="w-36 text-white absolute bottom-8" />
        {error && (
          <div className="alert alert-red w-[20rem]">
            <span>✕</span>
            <p className="w-full">
              {error.response?.status === 401
                ? "Invalid username or password."
                : "Something went wrong. Please try again."}
            </p>
          </div>
        )}
        <h1 className="text-5xl font-medium">Sign In</h1>
        <form onSubmit={loginUser} className="flex flex-col gap-2 items-center">
          <div className="flex flex-col gap-3 relative w-[20rem] mb-8">
            <TextInput
              label="Email"
              value={email}
              setValue={setEmail}
              required
            />
            <TextInput
              label="Password"
              value={password}
              setValue={setPassword}
              type="password"
              required
            />
          </div>
          <button
            type="submit"
            className="group btn btn-primary inline-flex gap-2 w-fit self-center items-center"
          >
            <p>Sign In</p>
            {!loading ? (
              <span className="group-hover:translate-x-2 transition-all">
                →
              </span>
            ) : (
              <span className="animate-spin">
                <Spinner className="w-4" />
              </span>
            )}
          </button>
          <p className="text-sm">
            or{" "}
            <Link to="/register" className="hover:underline text-teal-500">
              create a new account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
