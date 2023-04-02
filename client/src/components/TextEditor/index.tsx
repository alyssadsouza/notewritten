import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { File, getFile } from "../../utils/api";

export default function TextEditor() {
  const user_id = "0";
  const { notebook, fileId } = useParams();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const updateFile = async () => {
      if (fileId && notebook) {
        setFile(await getFile(user_id, notebook, fileId));
      }
    };
    updateFile();
  }, [fileId, notebook]);

  const html = useMemo(() => {
    if (file) {
      return {
        __html: DOMPurify.sanitize(file?.content),
      };
    }
  }, [file]);

  return (
    <div className="w-[794px] bg-transparent h-fit p-8">
      <div className="flex justify-between items-center">
        <div>breadcrumbs</div>
        <div>page count</div>
      </div>
      <div
		key={fileId}
        dangerouslySetInnerHTML={html}
        className="w-full h-[1123px] bg-white p-16 animate-appear"
      />
    </div>
  );
}
