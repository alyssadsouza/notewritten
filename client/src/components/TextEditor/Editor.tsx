import { useEffect, useRef } from "react";

import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import Warning from "@editorjs/warning";
import Delimiter from "@editorjs/delimiter";
import NestedList from "@editorjs/nested-list";
import Checklist from "@editorjs/checklist";
import SimpleImage from "@editorjs/simple-image";
import CodeTool from "@editorjs/code";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import Underline from '@editorjs/underline';
import Alert from "editorjs-alert";

import LaTeX, { LaTeXInline } from "./tools/latex";

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
        paragraph: {
          class: Paragraph,
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+O",
          config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author",
          },
        },
        warning: {
          class: Warning,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+W",
          config: {
            titlePlaceholder: "Title",
            messagePlaceholder: "Message",
          },
        },
        delimiter: Delimiter,
        alert: {
          class: Alert,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+A",
          config: {
            defaultType: "primary",
            messagePlaceholder: "Enter something",
          },
        },
        list: {
          class: NestedList,
          shortcut: "ALT+SHIFT+L",
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        image: SimpleImage,
        code: CodeTool,
        Marker: {
          class: Marker,
          shortcut: "ALT+SHIFT+M",
        },
        inlineCode: {
          class: InlineCode,
          shortcut: "CMD+E",
        },
		underline: {
			class: Underline,
			shortcut: "CMD+U"
		},
        latex: {
          // @ts-ignore
          class: LaTeX,
          shortcut: "CMD+SHIFT+M",
        },
        // TODO: implement
        // latexInline: {
        //   class: LaTeXInline,
        // },
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

  return (
    <div id="editorjs" className="prose prose-stone dark:prose-invert"></div>
  );
};
