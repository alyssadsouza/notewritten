import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import EquationEditor from "../components/EquationEditor";
import Header from "../components/Homepage/Header";
import Sidebar from "../components/Sidebar";

export default function Homepage() {
  const [tab, setTab] = useState<string>("Edit");
  const { notebook_id, page_id } = useParams();

  return (
    <div className="bg-slate-100">
      <div className="h-[5vh] shadow-sm">
        <Header tab={tab} setTab={setTab} />
      </div>
      <div
        className={`h-[95vh] flex ${
          tab === "Equations" ? "justify-start" : "justify-end"
        }`}
      >
        <div
          className={`h-full transition-all fixed left-0 shadow-md border ${
            tab === "Sidebar" ? "w-[20vw] min-w-[20rem] overflow-visible" : "w-0 overflow-hidden"
          }`}
        >
          <Sidebar />
        </div>
        <div
          className={`h-full min-w-[810px] ${
            tab === "Equations"
              ? "w-[65vw]"
              : tab === "Sidebar"
              ? "w-[80vw]"
              : "w-full"
          } flex flex-col items-center overflow-y-auto`}
        >
          {!page_id ? (
            <div className="h-full text-slate-400 flex flex-col items-center justify-center gap-4 w-56">
              <h1 className="text-5xl font-bold">⌘ N</h1>
              <h3 className="font-normal text-lg">
                Create a new file with ⌘ N or open an existing file.
              </h3>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
        <div
          className={`h-full transition-all overflow-hidden shadow-md fixed right-0 border ${
            tab === "Equations" ? "w-[35vw] min-w-[35rem]" : "w-0"
          }`}
        >
          <EquationEditor />
        </div>
      </div>
    </div>
  );
}
