import { Notebook } from "../../utils/api";

type Props = {
	notebooks: Notebook[];
}
export default function Sidebar({ notebooks }: Props) {
	return <div className="w-full h-full bg-white/50">sidebar</div>
}