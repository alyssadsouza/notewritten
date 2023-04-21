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

const buttons = [
  {
    tab: "Sidebar",
    activeIcon: <FolderActive className="w-6 text-teal-500 p-1" />,
    icon: <Folder className="p-1 w-6" />,
    tooltip: "Files",
  },
  {
    tab: "Edit",
    activeIcon: <EditActive className="w-6 text-teal-500 p-1" />,
    icon: <Edit className="p-1 w-6" />,
    tooltip: "Editor",
  },
  {
    tab: "Equations",
    activeIcon: <Equations className={`w-6 text-teal-500 p-1`} />,
    icon: <Equations className={`w-6 p-1`} />,
    tooltip: "Equation Editor",
  },
];

export default function Header({ tab, setTab }: Props) {
  const { logout } = useAuth();
  return (
    <div className="w-screen h-full bg-white/75 text-slate-400 flex justify-between items-center px-4 py-2 relative">
      <div className="flex gap-2">
        {buttons.map((button) => (
          <button
            key={button.tab}
            onClick={() => setTab(button.tab)}
            className={`hover:text-teal-500 transition-all p-1 group ${
              tab === button.tab && "bg-teal-50 rounded-full"
            }`}
          >
            {tab === button.tab ? button.activeIcon : button.icon}
            <p className="absolute z-[100] opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity translate-y-4 text-xs bg-black/70 text-white p-1 px-2 rounded-lg">
              {button.tooltip}
            </p>
          </button>
        ))}
      </div>
      <Link to="/">
        <Logo className="h-4 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
      </Link>
      <div>
        <button onClick={logout}>
          <Logout className="peer/logout w-4 hover:text-teal-500 transition-all" />
          <p className="absolute z-[100] opacity-0 invisible peer-hover/logout:visible peer-hover/logout:opacity-100 transition-opacity right-5 top-10 text-xs bg-black/70 text-white p-1 px-2 rounded-lg">
            Logout
          </p>
        </button>
      </div>
    </div>
  );
}
