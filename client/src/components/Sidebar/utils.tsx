import { NotebookPages } from "../../utils/api";

export const getPageName = (
  notebooks: NotebookPages[],
  notebook_id: string
) => {
  let pageName = "Untitled Page";
  let index = 1;
  const currNotebookPages = notebooks.find(
    (el) => el.notebook.id === notebook_id
  )?.pages;
  while (
    currNotebookPages &&
    currNotebookPages.find((page) => page.name === pageName)
  ) {
    pageName = `Untitled Page (${index})`;
    index++;
  }
  return pageName;
};

export const getNotebookName = (notebooks: NotebookPages[]) => {
  let name = "Untitled Notebook";
  let index = 1;
  while (
    notebooks &&
    notebooks.find((notebook) => notebook.notebook.name === name)
  ) {
    name = `Untitled Notebook (${index})`;
    index++;
  }
  return name;
};
