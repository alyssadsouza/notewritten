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
import { getNotebookName, getPageName } from "./utils";
import SidebarItemContextMenu from "./SidebarItemContextMenu";
import SidebarContextMenu from "./SidebarContextMenu";

type Props = {
  setTab: React.Dispatch<React.SetStateAction<string>>;
};

export default function Sidebar({ setTab }: Props) {
  const { token } = useAuth();
  const { notebooks, fetchNotebooks } = useNotebooks();
  const { notebook_id, page_id } = useParams();
  const navigate = useNavigate();
  // for context menu
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openSecondaryMenu, setOpenSecondaryMenu] = useState<boolean>(false);
  const [menuCoords, setMenuCoords] = useState({ x: 0, y: 0 });
  const [clickedNotebook, setClickedNotebook] = useState<boolean>(false);
  const [contextMenuId, setContextMenuId] = useState<string>("");

  useEffect(() => {
    // open context menu on right click, close on clicking elsewhere
    const handleClick = () => {
      setOpenMenu(false);
      setOpenSecondaryMenu(false);
    };
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
    if (token) {
      createNotebook(token, getNotebookName(notebooks))
        .then((response) => {
          const notebook = response.data;
          fetchNotebooks(token);
          navigate(`/${notebook.id}`);
        })
        .catch((err) => console.error(err));
    }
  };

  const openContextMenu = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    setMenuCoords({
      x: e.pageX,
      y: e.pageY,
    });
  };

  return (
    <div
      key={`${notebook_id}-${page_id}`}
      className="w-full h-full bg-slate-100 dark:bg-neutral-800 p-4 !overflow-visible text-sm text-slate-500 dark:text-neutral-500"
      onContextMenu={(e) => {
        setOpenSecondaryMenu(true);
        openContextMenu(e);
      }}
    >
      <div className="flex justify-between items-center gap-2">
        <p className="text-slate-400 dark:text-neutral-500 font-medium">Files</p>
        <div className="flex justify-end items-center gap-2">
          <button onClick={addNotebook}>
            <NewNotebook className="w-[1.1rem] hover:text-teal-500 text-slate-400 dark:text-neutral-500 transition-all" />
          </button>
          <button
            onClick={addPage}
            disabled={!notebook_id}
            className="text-slate-400 hover:text-teal-500 disabled:text-slate-300 dark:text-neutral-500 dark:disabled:text-neutral-700 disabled:hover-text-slate-300"
          >
            <NewPage className="w-[1.1rem] transition-all" />
          </button>
        </div>
      </div>
      <hr className="my-2 border-0" />
      {notebooks.map((notebook) => (
        <div className="flex flex-col gap-1 mb-2" key={notebook.notebook.id}>
          <Link
            to={`/${notebook.notebook.id}`}
            className={`flex items-center gap-2 p-1 hover:text-teal-500 transition-all`}
            key={notebook.notebook.id}
            onContextMenu={(e) => {
              setClickedNotebook(true);
              setContextMenuId(notebook.notebook.id);
              setOpenMenu(true);
              openContextMenu(e);
            }}
          >
            {notebook_id === notebook.notebook.id ? (
              <OpenNotebook className="w-5 text-yellow-500" />
            ) : (
              <Notebook className="w-4 text-slate-400 dark:text-neutral-500" />
            )}
            <h3
              className={`text-sm ${
                notebook.notebook.id === notebook_id
                  ? "font-semibold text-slate-800 dark:text-neutral-300"
                  : "font-normal"
              }`}
            >
              {notebook.notebook.name}
            </h3>
          </Link>
          {notebook.notebook.id === notebook_id &&
            notebook.pages.map((page) => (
              <Link
                to={`/${notebook.notebook.id}/${page.id}`}
                className={`flex items-center gap-2 p-1 pl-4 hover:text-teal-500 transition-all ${
                  page_id === page.id && "bg-slate-200 text-slate-800 dark:bg-neutral-700/75 dark:text-neutral-300"
                }`}
                key={page.id}
                onContextMenu={(e) => {
                  setClickedNotebook(false);
                  setContextMenuId(page.id);
                  setOpenMenu(true);
                  openContextMenu(e);
                }}
              >
                <Page
                  className={`w-5 ${
                    page.id === page_id ? "text-teal-500" : "text-slate-400 dark:text-neutral-500"
                  }`}
                />
                <p>{page.name}</p>
              </Link>
            ))}
        </div>
      ))}
      {openMenu && (
        <SidebarItemContextMenu
          coords={menuCoords}
          id={contextMenuId}
          isNotebook={clickedNotebook}
        />
      )}
      {!openMenu && openSecondaryMenu && (
        <SidebarContextMenu
          coords={menuCoords}
          setTab={setTab}
          addNotebook={addNotebook}
        />
      )}
    </div>
  );
}
