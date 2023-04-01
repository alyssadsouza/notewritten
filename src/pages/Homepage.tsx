import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import EquationEditor from "../components/EquationEditor";
import Header from "../components/Homepage/Header";
import Sidebar from "../components/Sidebar";
import { getNotebooks, Notebook } from "../utils/api";
import useAuth from "../hooks/useAuth";

export default function Homepage() {
  const { user } = useAuth();
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);

  useEffect(() => {
    const fetchNotebooks = async () => {
      if (user) {
        const data = await getNotebooks(user);
        setNotebooks(data);
      }
    };
    fetchNotebooks();
  }, [user]);
  console.log(notebooks);

  return (
    <div>
      <Header />
      <div>
        <Sidebar />
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <EquationEditor />
      </div>
    </div>
  );
}
