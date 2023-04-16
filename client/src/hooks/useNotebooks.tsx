import { useState, useMemo, ReactNode, createContext, useContext } from "react";
import { getNotebooks, NotebookPages, Token } from "../utils/api";

interface NotebooksContextType {
  fetchNotebooks: (token: Token) => void;
  notebooks: NotebookPages[];
  loading: boolean;
}

const NotebooksContext = createContext<NotebooksContextType>(
  {} as NotebooksContextType
);

export function NotebooksProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [notebooks, setNotebooks] = useState<NotebookPages[]>([]);

  const fetchNotebooks = async (token: Token) => {
    setLoading(true);
    getNotebooks(token)
      .then((response) => {
        setNotebooks(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({
      fetchNotebooks,
      notebooks,
	  loading
    }),
    [fetchNotebooks, notebooks, loading]
  );

  return (
    <NotebooksContext.Provider value={memoedValue}>
      {!loading && children}
    </NotebooksContext.Provider>
  );
}

export default function useNotebooks() {
  return useContext(NotebooksContext);
}
