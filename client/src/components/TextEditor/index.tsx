import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { NotebookPages, Page, getPageContent } from "../../utils/api";
import useNotebooks from "../../hooks/useNotebooks";
import useAuth from "../../hooks/useAuth";

export default function TextEditor() {
  const { token } = useAuth();
  const { notebooks } = useNotebooks();

  const { notebook_id, page_id } = useParams();
  const navigate = useNavigate();

  const [currentNotebook, setCurrentNotebook] = useState<NotebookPages | null>(null);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [fileContent, setFileContent] = useState<string>("");

  useEffect(() => {
    // get current notebook by param id
    const notebook = notebooks.find((notebook) => notebook.notebook.id === notebook_id);
    if (!notebook) {
      navigate("/");
    } else {
      setCurrentNotebook(notebook);
      // get current page by param id
      const page = notebook.pages.find((page) => page.id === page_id);
      if (!page) {
        navigate(`/${notebook.notebook.id}/`);
      } else {
        setCurrentPage(page);
      }
    }
  }, [notebook_id, page_id]);

  useEffect(() => {
    if (token && currentPage) {
      getPageContent(token, currentPage.id)
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => console.error(err));
    }
  }, [currentPage]);

  const html = useMemo(() => {
    if (fileContent) {
      return {
        __html: DOMPurify.sanitize(fileContent),
      };
    }
  }, [fileContent]);

  return (
    <div className="w-[794px] bg-transparent h-fit p-8">
      <div className="flex justify-between items-center text-sm my-1">
        <p>
          {currentNotebook?.notebook.name}{" "}
          <span className="text-gray-300 mx-2">/</span>{" "}
          <span className="font-semibold">{currentPage?.name}</span>
        </p>
        <p className="text-gray-400">Page 1 of 1</p>
      </div>
      <div
        key={page_id}
        dangerouslySetInnerHTML={html}
        className="w-full h-[1123px] bg-white p-16 animate-appear shadow-md"
      />
    </div>
  );
}
