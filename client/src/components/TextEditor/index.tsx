import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EditorComponent } from "./Editor";
import { OutputData } from "@editorjs/editorjs";
import {
  NotebookPages,
  Page,
  getPageContent,
  updatePageContent,
} from "../../utils/api";
import useNotebooks from "../../hooks/useNotebooks";
import useAuth from "../../hooks/useAuth";
import { ReactComponent as Loading } from "../../assets/spinner.svg";

const SAVE_CONTENT_TIMEOUT = 1000;

export default function TextEditor() {
  const { token } = useAuth();
  const { notebooks } = useNotebooks();

  const { notebook_id, page_id } = useParams();
  const navigate = useNavigate();

  const [currentNotebook, setCurrentNotebook] = useState<NotebookPages | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [initialContent, setInitialContent] = useState<OutputData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [content, setContent] = useState<string>(""); // stringified content used only for saving

  // Validate current page and notebook id and set page accordingly
  useEffect(() => {
    // get current notebook by param id
    const notebook = notebooks.find(
      (notebook) => notebook.notebook.id === notebook_id
    );
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

  // Get initial content from s3 bucket
  useEffect(() => {
    if (token && currentPage) {
      setIsLoading(true);
      getPageContent(token, currentPage.id)
        .then((response) => {
          setInitialContent(JSON.parse(response.data || ""));
        })
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false));
    }
  }, [currentPage]);

  // Save changes every 2 seconds after edits
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (token && page_id) {
        setIsSaving(true);
        updatePageContent(token, page_id, content)
          .then((res) => console.log(res))
          .catch((err) => console.error(err))
          .finally(() => setTimeout(() => setIsSaving(false), 1000));
      }
    }, SAVE_CONTENT_TIMEOUT);
    return () => clearTimeout(timeout);
  }, [content]);

  return (
    <>
      {!isLoading ? (
        <div className="w-[794px] bg-transparent p-8 mb-8">
          <div className="flex justify-between items-center text-sm my-1">
            <div className="inline-flex items-center gap-2">
              {currentNotebook?.notebook.name}
              <p className="text-gray-300 mx-2">/</p>
              <p className="font-semibold">{currentPage?.name}</p>
              {isSaving && (
                <Loading className="w-4 animate-spin text-slate-300 ml-2" />
              )}
            </div>
            <p className="text-gray-400">Page 1 of 1</p>
          </div>
          <div
            key={JSON.stringify(initialContent)}
            className="w-full min-h-[1123px] h-full bg-white py-12 px-6 animate-appear shadow-md"
          >
            <EditorComponent
              initialContent={initialContent}
              setContent={setContent}
            />
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full justify-center items-center">
          <Loading className="w-12 animate-spin" />
        </div>
      )}
    </>
  );
}
