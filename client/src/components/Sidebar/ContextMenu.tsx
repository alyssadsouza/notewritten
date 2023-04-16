import { ReactComponent as Download } from "../../assets/download.svg";
import { ReactComponent as Rename } from "../../assets/rename.svg";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import { deleteNotebook, deletePage } from "../../utils/api";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useNotebooks from "../../hooks/useNotebooks";

type Props = {
  coords: { x: number; y: number };
  id: string;
  isNotebook: boolean;
};

export default function ContextMenu({ coords, id, isNotebook }: Props) {
  const { token } = useAuth();
  const { fetchNotebooks, notebooks } = useNotebooks();
  const navigate = useNavigate();
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
          console.log(response.data);
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
          console.log(response.data);
		  fetchNotebooks(token);
          navigate("/");
        })
        .catch((err) => console.error(err));
    }
  };
  return (
    <div
      style={{ top: coords.y, left: coords.x }}
      className="fixed z-50 flex flex-col w-36 bg-white border shadow-md"
    >
      <button
        onClick={
          isNotebook
            ? () => downloadNotebookFunction(id)
            : () => downloadPageFunction(id)
        }
        className="flex gap-2 items-center justify-between hover:text-sky-400 transition-all"
      >
        <p className="p-2 text-left text-xs">Download</p>
        <Download className="w-4 mr-2" />
      </button>
      <hr />
      <button
        onClick={
          isNotebook
            ? () => renameNotebookFunction(id)
            : () => renamePageFunction(id)
        }
        className="flex gap-2 items-center justify-between hover:text-sky-400 transition-all"
      >
        <p className="p-2 text-left text-xs">Rename</p>
        <Rename className="w-4 mr-2" />
      </button>
      <hr />
      <button
        onClick={
          isNotebook
            ? () => deleteNotebookFunction(id)
            : () => deletePageFunction(id)
        }
        className="flex gap-2 items-center justify-between hover:text-sky-400 transition-all disabled:text-gray-300"
		disabled={notebooks.length  <= 1}
      >
        <p className="p-2 text-left text-xs">Delete</p>
        <Delete className="w-4 mr-2" />
      </button>
    </div>
  );
}
