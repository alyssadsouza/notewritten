import useAuth from "../../hooks/useAuth";

export default function Header() {
  const { logout } = useAuth();
  return (
  <div className="w-screen bg-slate-100 flex justify-between px-4 py-2">
	<div className="flex justify-between gap-2">
    <div>logo</div>
    <div>buttons</div>
  </div>
  <div>
    <button onClick={logout}>Logout</button>
  </div>
  </div>);
}
