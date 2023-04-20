import { ReactComponent as Download } from "../../assets/download.svg";
import { ReactComponent as Rename } from "../../assets/rename.svg";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import { deleteNotebook, deletePage } from "../../utils/api";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useNotebooks from "../../hooks/useNotebooks";
import ContextMenu from "./ContextMenu";

type Props = {
  coords: { x: number; y: number };
  id: string;
  isNotebook: boolean;
};

export default function SidebarItemContextMenu({ coords, id, isNotebook }: Props) {
  const { token } = useAuth();
  const { fetchNotebooks, notebooks } = useNotebooks();
  const navigate = useNavigate();
  const buttons = [
    {
      onClick: isNotebook
        ? () => downloadNotebookFunction(id)
        : () => downloadPageFunction(id),
      label: "Download",
      icon: <Download className="w-4 mr-2" />,
    },
    {
      onClick: isNotebook
        ? () => renameNotebookFunction(id)
        : () => renamePageFunction(id),
      label: "Rename",
      icon: <Rename className="w-4 mr-2" />,
    },
    {
      onClick: isNotebook
        ? () => deleteNotebookFunction(id)
        : () => deletePageFunction(id),
      label: "Delete",
      icon: <Delete className="w-4 mr-2" />,
      disabled: isNotebook && notebooks.length <= 1,
    },
  ];
  const downloadPageFunction = (id: string) => {
    //
  };

  const downloadNotebookFunction = (id: string) => {
    //
  };

  const renamePageFunction = (id: string) => {
    //
  };

  const renameNotebookFunction = (id: string) => {
    //
  };

  const deletePageFunction = (id: string) => {
    if (token) {
      deletePage(token, id)
        .then((response) => {
          fetchNotebooks(token);
          navigate("/");
        })
        .catch((err) => console.error(err));
    }
  };

  const deleteNotebookFunction = (id: string) => {
    if (token) {
      deleteNotebook(token, id)
        .then((response) => {
          fetchNotebooks(token);
          navigate("/");
        })
        .catch((err) => console.error(err));
    }
  };
  return <ContextMenu coords={coords} buttons={buttons} />;
}
