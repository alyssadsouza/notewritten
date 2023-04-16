import { ReactComponent as Spinner } from "../assets/spinner.svg";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4 bg-slate-100">
      <Spinner className="w-12 animate-spin text-slate-500" />
    </div>
  );
}
