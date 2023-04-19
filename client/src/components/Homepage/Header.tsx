import useAuth from "../../hooks/useAuth";
import { ReactComponent as FolderActive } from "../../assets/folder-solid.svg";
import { ReactComponent as Folder } from "../../assets/folder-outline.svg";
import { ReactComponent as EditActive } from "../../assets/edit-solid.svg";
import { ReactComponent as Edit } from "../../assets/edit-outline.svg";
import { ReactComponent as Equations } from "../../assets/square-root.svg";
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
    <div className="w-screen h-full bg-white/50 text-slate-400 flex justify-between items-center px-4 py-2 relative">
      <div className="flex gap-4">
        <button
          onClick={() => setTab("Sidebar")}
          className="hover:text-sky-500 transition-all"
        >
          {tab === "Sidebar" ? (
            <FolderActive className="peer/folder w-[1.15rem] text-sky-500" />
          ) : (
            <Folder className="peer/folder w-[1.15rem]" />
          )}
          <p className="absolute z-50 opacity-0 invisible peer-hover/folder:visible peer-hover/folder:opacity-100 transition-opacity translate-y-4 text-xs bg-black/70 text-white p-1 px-2 rounded-lg">
            Files
          </p>
        </button>
        <button
          onClick={() => setTab("Edit")}
          className="hover:text-sky-500 transition-all"
        >
          {tab === "Edit" ? (
            <EditActive className="peer/edit w-[1.15rem] text-sky-500" />
          ) : (
            <Edit className="peer/edit w-[1.15rem]" />
          )}
          <p className="absolute z-50 opacity-0 invisible peer-hover/edit:visible peer-hover/edit:opacity-100 transition-opacity translate-y-4 text-xs bg-black/70 text-white p-1 px-2 rounded-lg">
            Text Editor
          </p>
        </button>
        <button
          onClick={() => setTab("Equations")}
          className="hover:text-sky-500 transition-all"
        >
          <Equations
            className={`peer/equations w-[1.15rem] ${
              tab === "Equations" && "text-sky-500"
            }`}
          />
          <p className="absolute z-50 opacity-0 invisible peer-hover/equations:visible peer-hover/equations:opacity-100 transition-opacity translate-y-4  text-xs bg-black/70 text-white p-1 px-2 rounded-lg">
            Equation Editor
          </p>
        </button>
      </div>
      <Link to="/">
        <Logo className="h-4 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
      </Link>
      <div>
        <button onClick={logout}>
          <Logout className="peer/logout w-[1.15rem] hover:text-sky-500 transition-all" />
          <p className="absolute z-50 opacity-0 invisible peer-hover/logout:visible peer-hover/logout:opacity-100 transition-opacity right-5 top-10 text-xs bg-black/70 text-white p-1 px-2 rounded-lg">
            Logout
          </p>
        </button>
      </div>
    </div>
  );
}
