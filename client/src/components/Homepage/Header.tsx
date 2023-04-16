import useAuth from "../../hooks/useAuth";
import { ReactComponent as Folder } from "../../assets/folder.svg";
import { ReactComponent as Edit } from "../../assets/edit.svg";
import { ReactComponent as Equations } from "../../assets/equations.svg";
import { ReactComponent as Logout } from "../../assets/logout.svg";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { Link } from "react-router-dom";

type Props = {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
};

export default function Header({ tab, setTab }: Props) {
  const { logout } = useAuth();
  return (
    <div className="w-screen h-full bg-white/50 flex justify-between items-center px-4 py-2">
      <div className="flex gap-4">
        <button
          onClick={() => setTab("Sidebar")}
          className="hover:text-sky-500 transition-all"
        >
          <Folder className={`peer/files w-5 ${tab === "Sidebar" && "text-sky-500"}`} />
		  <p className="absolute z-50 opacity-0 peer-hover/files:opacity-100 transition-opacity translate-y-4 text-xs bg-black/70 text-white p-1 px-2 rounded-lg">
            Files
          </p>
        </button>
        <button
          onClick={() => setTab("Edit")}
          className="hover:text-sky-500 transition-all"
        >
          <Edit className={`peer/edit w-5 ${tab === "Edit" && "text-sky-500"}`} />
		  <p className="absolute z-50 opacity-0 peer-hover/edit:opacity-100 transition-opacity translate-y-4 text-xs bg-black/70 text-white p-1 px-2 rounded-lg">
           Text Editor
          </p>
        </button>
        <button
          onClick={() => setTab("Equations")}
          className="hover:text-sky-500 transition-all"
        >
          <Equations
            className={`peer/equations w-5 ${tab === "Equations" && "text-sky-500"}`}
          />
		  <p className="absolute z-50 opacity-0 peer-hover/equations:opacity-100 transition-opacity translate-y-4  text-xs bg-black/70 text-white p-1 px-2 rounded-lg">
            Equation Editor
          </p>
        </button>
      </div>
	  <Link to="/"><Logo className="h-4 absolute left-1/2 -translate-x-1/2 top-3" /></Link>
      <div>
        <button onClick={logout}>
          <Logout className="peer/logout w-6 hover:text-sky-500 transition-all" />
          <p className="absolute z-50 opacity-0 peer-hover/logout:opacity-100 transition-opacity right-5 top-10 text-xs bg-black/70 text-white p-1 px-2 rounded-lg">
            Logout
          </p>
        </button>
      </div>
    </div>
  );
}
