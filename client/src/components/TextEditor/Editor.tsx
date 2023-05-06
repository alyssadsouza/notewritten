import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import { useEffect, useRef } from "react";
import LaTeX from 'editorjs-simple-latex';

type Props = {
  initialContent: OutputData | undefined;
  setContent: React.Dispatch<React.SetStateAction<string>>;
};

export const EditorComponent = ({ initialContent, setContent }: Props) => {
  const ejInstance = useRef<EditorJS | null>(null);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      data: initialContent,
      onChange: async () => {
        let content = await editor.saver.save();
        setContent(JSON.stringify(content));
      },
      tools: {
        header: {
          // @ts-ignore
          class: Header,
          shortcut: "CMD+SHIFT+H",
          config: {
            placeholder: "Heading",
            levels: [1, 2, 3, 4, 5],
            defaultLevel: 1,
          },
        },
        latex: {
          class: LaTeX,
		  shortcut: "CMD+SHIFT+M",
        },
      },
    });
  };

  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  return <div id="editorjs"></div>;
};
