import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import EquationEditor from "../components/EquationEditor";
import Header from "../components/Homepage/Header";
import Sidebar from "../components/Sidebar";
import { getNotebooks, Notebook } from "../utils/api";
import useAuth from "../hooks/useAuth";

export default function Homepage() {
  const { token } = useAuth();
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [tab, setTab] = useState<string>("Edit");
  const { notebook, fileId } = useParams();

  return (
    <div className="bg-slate-100">
      <div className="h-[5vh] shadow-sm">
        <Header tab={tab} setTab={setTab} />
      </div>
      <div className={`h-[95vh] flex ${tab === "Equations" ? "justify-start" : "justify-end"}`}>
        <div
          className={`h-full transition-all overflow-hidden fixed left-0 shadow-md border ${
            tab === "Sidebar" ? "w-[20vw]" : "w-0"
          }`}
        >
          <Sidebar notebooks={notebooks} />
        </div>
        <div className={`h-full min-w-[810px] ${tab === "Equations" ? "w-[65vw]" : tab === "Sidebar" ? "w-[80vw]" : "w-full"} flex flex-col items-center overflow-y-auto`}>
          {!fileId ? (
            <div className="h-full text-slate-500 flex flex-col items-center justify-center gap-4 w-56">
              <h1 className="text-5xl font-bold">⌘ N</h1>
              <h3 className="font-normal text-lg">Create a new file with ⌘ N or open an existing file.</h3>
              </div>
          ) : (
            <Outlet />
          )}
        </div>
        <div
          className={`h-full transition-all overflow-hidden shadow-md fixed right-0 border ${
            tab === "Equations" ? "w-[35vw]" : "w-0"
          }`}
        >
          <EquationEditor />
        </div>
      </div>
    </div>
  );
}
