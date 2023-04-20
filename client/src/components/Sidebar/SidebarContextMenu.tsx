import { ReactComponent as Add } from "../../assets/add.svg";
import { ReactComponent as Close } from "../../assets/close.svg";
import { deleteNotebook, deletePage } from "../../utils/api";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useNotebooks from "../../hooks/useNotebooks";
import ContextMenu from "./ContextMenu";

type Props = {
  coords: { x: number; y: number };
  setTab: React.Dispatch<React.SetStateAction<string>>;
  addNotebook: () => void;
};

export default function SidebarContextMenu({
  coords,
  setTab,
  addNotebook,
}: Props) {
  const buttons = [
    {
      onClick: addNotebook,
      label: "New Notebook",
      icon: <Add className="w-4 mr-2" />,
    },
    {
      onClick: () => setTab("Edit"),
      label: "Hide Sidebar",
      icon: <Close className="w-4 mr-2" />,
    },
  ];
  return <ContextMenu coords={coords} buttons={buttons} />;
}
