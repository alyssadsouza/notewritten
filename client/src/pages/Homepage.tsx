import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import EquationEditor from "../components/EquationEditor";
import Header from "../components/Homepage/Header";
import Sidebar from "../components/Sidebar";

export default function Homepage() {
  const [tab, setTab] = useState<string>("Sidebar");

  return (
    <div className="bg-slate-50 text-slate-800 dark:bg-neutral-900 dark:text-gray-200">
      <div className="h-[5vh] shadow-sm">
        <Header tab={tab} setTab={setTab} />
      </div>
      <div
        className={`h-[95vh] flex ${
          tab === "Equations" ? "justify-start" : "justify-end"
        }`}
      >
        <div
          className={`h-full transition-all fixed left-0 z-50 border dark:border-0 dark:border-t dark:border-neutral-700/70 ${
            tab === "Sidebar"
              ? "w-[20vw] min-w-[20rem] overflow-visible"
              : "w-0 overflow-hidden"
          }`}
        >
          <Sidebar setTab={setTab} />
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
          <Outlet />
        </div>
        <div
          className={`h-full transition-all overflow-hidden z-50 shadow-md fixed right-0 border dark:border-0 ${
            tab === "Equations" ? "w-[35vw] min-w-[35rem]" : "w-0"
          }`}
        >
          <EquationEditor />
        </div>
      </div>
    </div>
  );
}
