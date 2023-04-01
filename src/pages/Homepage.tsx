import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import EquationEditor from "../components/EquationEditor";
import Header from "../components/Homepage/Header";
import Sidebar from "../components/Sidebar";
import { getNotebooks, Notebook } from "../utils/api";
import useAuth from "../hooks/useAuth";

export default function Homepage() {
  const { user } = useAuth();
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [tab, setTab] = useState<string>("Edit");
  const { notebook, fileId } = useParams();

  useEffect(() => {
    const fetchNotebooks = async () => {
      if (user) {
        const data = await getNotebooks(user);
        setNotebooks(data);
      }
    };
    fetchNotebooks();
  }, [user]);

  return (
    <div className="bg-slate-100 h-screen w-screen">
      <div className="h-[5vh] shadow-sm">
        <Header tab={tab} setTab={setTab} />
      </div>
      <div className="h-[95vh] flex justify-between">
        <div
          className={`h-full transition-all overflow-hidden shadow-md border ${
            tab === "Sidebar" ? "w-[20vw]" : "w-0"
          }`}
        >
          <Sidebar notebooks={notebooks} />
        </div>
        <div className="h-full">
          {!fileId ? (
            <div>Create a new file with cmd + N or open an existing file.</div>
          ) : (
            <Outlet />
          )}
        </div>
        <div
          className={`h-full transition-all overflow-hidden shadow-md border ${
            tab === "Equations" ? "w-[35vw]" : "w-0"
          }`}
        >
          <EquationEditor />
        </div>
      </div>
    </div>
  );
}
