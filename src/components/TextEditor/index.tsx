import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { File, getFile } from "../../utils/api";
import DOMPurify from "dompurify";

export default function TextEditor() {
  const { fileId } = useParams();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const updateFile = async () => {
      if (fileId) {
        setFile(await getFile(fileId));
      }
    };
    updateFile();
  }, [fileId]);

  const html = useMemo(() => {
    if (file) {
      return {
        __html: DOMPurify.sanitize(file?.content),
      };
    }
  }, [file]);

  return (
    <div className="w-[794px] h-full overflow-y-auto px-8 pb-8">
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
