import { useNavigate, useParams } from "react-router-dom";
import useNotebooks from "../../hooks/useNotebooks";
import { useEffect } from "react";

export default function NoPageOpen() {
  const { notebooks } = useNotebooks();
  const { notebook_id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    // get current notebook by param id
    const notebook = notebooks.find((notebook) => notebook.notebook.id === notebook_id);
    if (!notebook) {
      navigate("/");
    }
  }, [notebook_id]);
  return (
    <div className="h-full text-slate-400 dark:text-neutral-600 flex flex-col items-center justify-center gap-4 w-64">
      <h1 className="text-5xl font-bold">⌘ N</h1>
      <h3 className="font-normal text-base">
        Create a new document with ⌘ N or open an existing document.
      </h3>
    </div>
  );
}
