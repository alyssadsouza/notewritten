import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import {
  NotebookPages,
  Page,
  getPageContent,
  updatePageContent,
} from "../../utils/api";
import useNotebooks from "../../hooks/useNotebooks";
import useAuth from "../../hooks/useAuth";

const SAVE_CONTENT_INTERVAL = 2000;

export default function TextEditor() {
  const { token } = useAuth();
  const { notebooks } = useNotebooks();

  const { notebook_id, page_id } = useParams();
  const navigate = useNavigate();

  const [currentNotebook, setCurrentNotebook] = useState<NotebookPages | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [initialContent, setInitialContent] = useState<PartialBlock[]>([]);
  const [content, setContent] = useState<string>("");

  const editor: BlockNoteEditor | null = useBlockNote({
    // If the editor contents were previously saved, restores them.
    initialContent,
    // Serializes and saves the editor contents to local storage.
    onEditorContentChange: (editor) => {
      setContent(JSON.stringify(editor.topLevelBlocks));
    },
  });

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
      getPageContent(token, currentPage.id)
        .then((response) => {
          setInitialContent(JSON.parse(response.data));
        })
        .catch((err) => console.error(err));
    }
  }, [currentPage]);

  // Update editor's initial content when initialContent changes
  useEffect(() => {
    if (initialContent.length && editor) {
      editor.replaceBlocks(editor.topLevelBlocks, initialContent);
    }
  }, [initialContent, editor]);

  // Save changes every 3 seconds after edits
  useEffect(() => {
    const interval = setTimeout(() => {
      console.log("Autosaving content...");
      if (token && page_id) {
        updatePageContent(token, page_id, content)
          .then((res) => console.log(res))
          .catch((err) => console.error(err));
      }
    }, SAVE_CONTENT_INTERVAL);
    return () => clearInterval(interval);
  }, [content]);

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
      {initialContent.length > 0 && (
        <div key={initialContent} className="w-full h-[1123px] bg-white py-16 animate-appear shadow-md">
          <BlockNoteView editor={editor} />
        </div>
      )}
    </div>
  );
}
