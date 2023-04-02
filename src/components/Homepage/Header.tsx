import useAuth from "../../hooks/useAuth";

type Props = {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}

export default function Header({tab, setTab}: Props) {
  const { logout } = useAuth();
  return (
  <div className="w-screen h-full bg-white/50 flex justify-between items-center px-4 py-2">
	<div className="flex gap-6">
    <div>logo</div>
    <div className="flex gap-2">
      <button onClick={() => setTab("Sidebar")} className="hover:text-blue-500 transition-all">Sidebar</button>
      <button onClick={() => setTab("Edit")} className="hover:text-blue-500 transition-all">Editor</button>
      <button onClick={() => setTab("Equations")} className="hover:text-blue-500 transition-all">Equations</button>
    </div>
  </div>
  <div>
    <button onClick={logout}>Logout</button>
  </div>
  </div>);
}
