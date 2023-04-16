import { Link, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useNotebooks from "../../hooks/useNotebooks";
import { ReactComponent as NewPage } from "../../assets/add-document.svg";
import { ReactComponent as NewNotebook } from "../../assets/add-notebook.svg";
import { ReactComponent as Notebook } from "../../assets/notebook.svg";
import { ReactComponent as OpenNotebook } from "../../assets/open-notebook.svg";
import { ReactComponent as Page } from "../../assets/document.svg";
import { createPage } from "../../utils/api";
import { useEffect, useState } from "react";
import ContextMenu from "./ContextMenu";

export default function Sidebar() {
  const { token } = useAuth();
  const { notebooks, fetchNotebooks } = useNotebooks();
  const { notebook_id, page_id } = useParams();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [menuCoords, setMenuCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // open context menu on right click, close on clicking elsewhere
    const handleClick = () => setOpenMenu(false);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const getPageName = () => {
    let pageName = "Untitled Page";
    let index = 1;
    const currNotebookPages = notebooks.find(
      (el) => el.notebook.id === notebook_id
    )?.pages;
    while (
      currNotebookPages &&
      currNotebookPages.find((page) => page.name === pageName)
    ) {
      pageName = `Untitled Page (${index})`;
      index++;
    }
    return pageName;
  };

  const addPage = () => {
    if (token && notebook_id) {
      createPage(token, notebook_id, getPageName())
        .then((response) => {
          const page = response.data;
          fetchNotebooks(token);
          navigate(page.id);
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
      className="w-full h-full bg-slate-50 p-4 !overflow-visible"
    >
      <div className="flex justify-end items-center gap-2">
        <button>
          <NewNotebook className="w-5 hover:text-sky-500 text-slate-400 transition-all" />
        </button>
        <button onClick={addPage}>
          <NewPage className="w-5 hover:text-sky-500 text-slate-400 transition-all" />
        </button>
      </div>
      <hr className="my-4" />
      {notebooks.map((notebook) => (
        <div className="flex flex-col gap-2" key={notebook.notebook.id}>
          <Link
            to={`/${notebook.notebook.id}`}
            className={`flex items-center gap-2 rounded-lg hover:text-sky-500 transition-all ${
              page_id === notebook.notebook.id && "bg-sky-100"
            }`}
            key={notebook.notebook.id}
          >
            {notebook_id === notebook.notebook.id ? (
              <OpenNotebook className="w-4" />
            ) : (
              <Notebook className="w-4" />
            )}
            <h3 className="text-base font-medium">{notebook.notebook.name}</h3>
          </Link>
          {notebook.pages.map((page) => (
            <Link
              to={page.id}
              className={`flex items-center gap-2 p-1 pl-4 rounded-lg hover:text-sky-500 transition-all ${
                page_id === page.id && "bg-sky-100"
              }`}
              key={page.id}
              onContextMenu={(e) => openContextMenu(e)}
            >
              <Page className="w-4" />
              <p>{page.name}</p>
            </Link>
          ))}
        </div>
      ))}
      {openMenu && (
        <ContextMenu
          coords={menuCoords}
          id=""
          downloadFunction={(id) => {}}
          renameFunction={(id) => {}}
          deleteFunction={(id) => {}}
        />
      )}
    </div>
  );
}
