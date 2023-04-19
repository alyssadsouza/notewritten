import { Link, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useNotebooks from "../../hooks/useNotebooks";
import { ReactComponent as NewPage } from "../../assets/add-document.svg";
import { ReactComponent as NewNotebook } from "../../assets/add-notebook.svg";
import { ReactComponent as Notebook } from "../../assets/notebook.svg";
import { ReactComponent as OpenNotebook } from "../../assets/open-notebook.svg";
import { ReactComponent as Page } from "../../assets/document.svg";
import { createPage, createNotebook } from "../../utils/api";
import { useEffect, useState } from "react";
import ContextMenu from "./ContextMenu";
import { getNotebookName, getPageName } from "./utils";

export default function Sidebar() {
  const { token } = useAuth();
  const { notebooks, fetchNotebooks } = useNotebooks();
  const { notebook_id, page_id } = useParams();
  const navigate = useNavigate();
  // for context menu
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [menuCoords, setMenuCoords] = useState({ x: 0, y: 0 });
  const [clickedNotebook, setClickedNotebook] = useState<boolean>(false);
  const [contextMenuId, setContextMenuId] = useState<string>("");

  useEffect(() => {
    // open context menu on right click, close on clicking elsewhere
    const handleClick = () => setOpenMenu(false);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const addPage = () => {
    if (token && notebook_id) {
      createPage(token, notebook_id, getPageName(notebooks, notebook_id))
        .then((response) => {
          const page = response.data;
          fetchNotebooks(token);
          navigate(page.id);
        })
        .catch((err) => console.error(err));
    }
  };

  const addNotebook = () => {
    if (token && notebook_id) {
      createNotebook(token, getNotebookName(notebooks))
        .then((response) => {
          const notebook = response.data;
          fetchNotebooks(token);
          navigate(`/${notebook.id}`);
        })
        .catch((err) => console.error(err));
    }
  };

  const openContextMenu = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    setOpenMenu(true);
    setMenuCoords({
      x: e.pageX,
      y: e.pageY,
    });
  };

  return (
    <div
      key={`${notebook_id}-${page_id}`}
      className="w-full h-full bg-slate-50 p-4 !overflow-visible text-sm"
    >
      <div className="flex justify-between items-center gap-2">
        <p className="text-slate-400 font-medium">Files</p>
        <div className="flex justify-end items-center gap-2">
          <button onClick={addNotebook}>
            <NewNotebook className="w-[1.2rem] hover:text-sky-500 text-slate-400 transition-all" />
          </button>
          <button onClick={addPage}>
            <NewPage className="w-[1.2rem] hover:text-sky-500 text-slate-400 transition-all" />
          </button>
        </div>
      </div>
      <hr className="my-4" />
      {notebooks.map((notebook) => (
        <div className="flex flex-col gap-2 mb-4" key={notebook.notebook.id}>
          <Link
            to={`/${notebook.notebook.id}`}
            className={`flex items-center gap-2 rounded-lg hover:text-sky-500 transition-all ${
              page_id === notebook.notebook.id && "bg-sky-100"
            }`}
            key={notebook.notebook.id}
            onContextMenu={(e) => {
              setClickedNotebook(true);
              setContextMenuId(notebook.notebook.id);
              openContextMenu(e);
            }}
          >
            {notebook_id === notebook.notebook.id ? (
              <OpenNotebook className="w-4 text-yellow-500" />
            ) : (
              <Notebook className="w-3 text-yellow-500" />
            )}
            <h3
              className={`text-sm ${
                notebook.notebook.id === notebook_id
                  ? "font-bold"
                  : "font-normal"
              }`}
            >
              {notebook.notebook.name}
            </h3>
          </Link>
          {notebook.pages.map((page) => (
            <Link
              to={`/${notebook.notebook.id}/${page.id}`}
              className={`flex items-center gap-2 p-1 pl-4 rounded-lg hover:text-sky-500 transition-all ${
                page_id === page.id && "bg-sky-100"
              }`}
              key={page.id}
              onContextMenu={(e) => {
                setClickedNotebook(false);
                setContextMenuId(page.id);
                openContextMenu(e);
              }}
            >
              <Page className="w-4 text-sky-500" />
              <p>{page.name}</p>
            </Link>
          ))}
        </div>
      ))}
      {openMenu && (
        <ContextMenu
          coords={menuCoords}
          id={contextMenuId}
          isNotebook={clickedNotebook}
        />
      )}
    </div>
  );
}
