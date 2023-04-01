import { Outlet, useLoaderData } from "react-router-dom";
import EquationEditor from "../components/EquationEditor";
import Header from "../components/Homepage/Header";
import Sidebar from "../components/Sidebar";
import { getNotebooks } from "../utils/api";

const user = "sample_user";

export async function loader() {
  const notebooks = await getNotebooks(user);
  return { notebooks };
}

export default function Homepage() {
  const { notebooks } = useLoaderData();
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
