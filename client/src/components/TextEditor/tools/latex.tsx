import katex from "katex";

type Data = {
  equation: string;
};

export default class LaTeX {
  data: Data;

  constructor({ data }: { data: Data }) {
    this.data = data;
  }

  static get toolbox() {
    return {
      title: "Equation",
      icon: `<svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><path d="m16.04 4a3.009 3.009 0 0 0 -2.891 2.2l-4.049 14.568a1.678 1.678 0 0 1 -1.6 1.232 1.747 1.747 0 0 1 -1.622-1.159l-2.793-7.68a3.461 3.461 0 0 0 -2.312-2.189 1 1 0 0 1 .471-1.944 5.434 5.434 0 0 1 3.721 3.45l2.474 6.8 3.784-13.616a5.015 5.015 0 0 1 4.817-3.662h6.96a1 1 0 0 1 0 2zm7.56 8.2a1 1 0 0 0 -1.4.2l-2.2 2.933-2.2-2.933a1 1 0 0 0 -1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 1 0 1.6-1.2l-2.55-3.4 2.55-3.4a1 1 0 0 0 -.2-1.4z"/></svg>`,
    };
  }

  render() {
    return renderLatex(this.data);
  }

  save(blockContent: any) {
    const input = blockContent.querySelector("textarea");

    return {
      equation: input.value,
    };
  }

  validate(savedData: Data) {
    if (!savedData.equation.trim()) {
      return false;
    }

    return true;
  }
}

export class LaTeXInline {
  _state: any;
  button: any;
  api: any;
  tag: string;
  class: string;

  static get isInline() {
    return true;
  }

  get state() {
    return this._state;
  }

  set state(state) {
    this._state = state;
  }
  // @ts-ignore
  constructor({ api }) {
    this.api = api;
    this.button = null;
    this._state = false;

    this.tag = "span";
    this.class = "latex-inline";
  }

  // TODO: enable inline latex so that it renders on load
  static get sanitize() {
	return {
		span: {
			class: 'latex-inline'
		}
	};
}

  render() {
    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.innerHTML =
      '<svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><path d="m16.04 4a3.009 3.009 0 0 0 -2.891 2.2l-4.049 14.568a1.678 1.678 0 0 1 -1.6 1.232 1.747 1.747 0 0 1 -1.622-1.159l-2.793-7.68a3.461 3.461 0 0 0 -2.312-2.189 1 1 0 0 1 .471-1.944 5.434 5.434 0 0 1 3.721 3.45l2.474 6.8 3.784-13.616a5.015 5.015 0 0 1 4.817-3.662h6.96a1 1 0 0 1 0 2zm7.56 8.2a1 1 0 0 0 -1.4.2l-2.2 2.933-2.2-2.933a1 1 0 0 0 -1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 1 0 1.6-1.2l-2.55-3.4 2.55-3.4a1 1 0 0 0 -.2-1.4z"/></svg>';
    this.button.classList.add(this.api.styles.inlineToolButton);

    return this.button;
  }

  surround(range: any) {
    if (this.state) {
      this.unwrap(range);
      return;
    }

    this.wrap(range);
  }

  wrap(range: Range) {
    const selectedText = range.toString();
    const equation = renderLatex({ equation: selectedText }, false);

    equation.classList.add(this.class);
	range.deleteContents();
    range.insertNode(equation);

    this.api.selection.expandToTag(equation);
  }

  unwrap(range: Range) {
    const mark = this.api.selection.findParentTag(this.tag, this.class);
    const text = range.extractContents();

    mark.remove();

    range.insertNode(text);
  }

  checkState() {
    const mark = this.api.selection.findParentTag(this.tag);

    this.state = !!mark;
  }
}


const errorMessage = (message: string) => {
  let errorMessageSpan = document.createElement("span");
  errorMessageSpan.className = "errorMessage";
  errorMessageSpan.innerText = message;
  return errorMessageSpan;
};

const renderLatex = (data: Data, displayMode: boolean = true) => {
  const wrapper = displayMode ? document.createElement("div") : document.createElement("span");
  const preview = document.createElement("button");
  const input = document.createElement("textarea");

  if (typeof katex === "undefined") {
    return errorMessage(
      "[Error] KaTeX is not found! Add KaTeX to this webpage to continue!"
    );
  }

  wrapper.classList.add("latex-block");
  preview.classList.add("latex-block-preview","peer");
  input.classList.add("latex-block-input");

  input.placeholder = `\\begin{align}
  a&=b+c \\\\
  d+e&=f
\\end{align}`;
  input.value = data && data.equation ? data.equation : "";

  katex.render(input.value, preview, {
    displayMode,
    throwOnError: false,
  });

  if (!input.value) {
	input.classList.add("block");
}
  input.addEventListener("input", (e) => {
	if (!input.value) {
		input.classList.add("block");
	} else {
		input.classList.remove("block");
	}
  })

  input.addEventListener("keyup", (e) => {
    e.preventDefault();
    katex.render(input.value, preview, {
      displayMode,
      throwOnError: false,
    });
  });

  wrapper.appendChild(preview);
  wrapper.appendChild(input);

  return wrapper;
};
