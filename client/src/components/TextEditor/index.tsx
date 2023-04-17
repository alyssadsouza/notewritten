import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { PageContent, getPageContent } from "../../utils/api";
import useNotebooks from "../../hooks/useNotebooks";
import useAuth from "../../hooks/useAuth";

export default function TextEditor() {
  const { token } = useAuth();
  const { notebooks } = useNotebooks();
  const { notebook_id, page_id } = useParams();
  const [fileContent, setFileContent] = useState<string>("");

  const currentNotebook = useMemo(
    () => notebooks.find((notebook) => notebook.notebook.id === notebook_id),
    [notebook_id]
  );
  const currentPage = useMemo(
    () => currentNotebook?.pages.find((page) => page.id === page_id),
    [currentNotebook, page_id]
  );

  useEffect(() => {
    if (token && page_id) {
      getPageContent(token, page_id)
        .then((response) => {
			console.log(response.data);
		})
        .catch((err) => console.error(err));
    }
  }, [page_id]);

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
