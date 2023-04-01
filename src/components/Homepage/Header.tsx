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
    <ul className="flex gap-2">
      <li onClick={() => setTab("Sidebar")} className="cursor-pointer hover:text-blue-500 transition-all">Sidebar</li>
      <li onClick={() => setTab("Edit")} className="cursor-pointer hover:text-blue-500 transition-all">Editor</li>
      <li onClick={() => setTab("Equations")} className="cursor-pointer hover:text-blue-500 transition-all">Equations</li>
    </ul>
  </div>
  <div>
    <button onClick={logout}>Logout</button>
  </div>
  </div>);
}
