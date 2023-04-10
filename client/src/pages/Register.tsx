import React, { useState } from "react";
import TextInput from "../components/Inputs/TextInput";
import { register } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confPassword, setConfPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (password != confPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    register(email, password)
      .then((response) => {
        if (response.status === 200) {
          setSuccess(true);
          setTimeout(() => navigate("/login"), 1500);
        }
      })
      .catch((error) => {
        console.error(error)
        if (error.response.status === 400) {
          setError("A user with that email already exists.")
        } else {
          setError("Something went wrong. Please try again.")
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-16">
      {error && (
        <div className="alert alert-red w-[20rem]">
          <span>✕</span>
          <p className="w-full">{error}</p>
        </div>
      )}
      {success && (
        <div className="alert alert-green w-[20rem]">
          <span>✓</span>
          <p className="w-full">Created account successfully!</p>
        </div>
      )}
      <h1 className="text-5xl font-bold">Sign Up</h1>
      <form onSubmit={createUser} className="flex flex-col gap-2 items-center">
        <div className="flex flex-col gap-4 relative w-[20rem] mb-8">
          <TextInput label="Email" value={email} setValue={setEmail} required />
          <TextInput
            label="Password"
            value={password}
            setValue={setPassword}
            type="password"
            required
          />
          <TextInput
            label="Confirm Password"
            value={confPassword}
            setValue={setConfPassword}
            type="password"
            required
          />
        </div>
        <button
          type="submit"
          className="group btn btn-green inline-flex gap-2 w-fit self-center"
        >
          <p>Create Account</p>
          {!loading ? (
            <span className="group-hover:translate-x-2 transition-all">→</span>
          ) : (
            <span className="animate-spin">↻</span>
          )}
        </button>
        <p className="text-sm">
          or{" "}
          <Link to="/login" className="hover:underline text-emerald-500">
            login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
