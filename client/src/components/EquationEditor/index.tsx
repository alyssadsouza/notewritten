import { ReactComponent as PlaceholderImage } from "../../assets/placeholder.svg";

export default function EquationEditor() {
  return (
    <div className="w-full h-full bg-white/75 text-sm text-gray-300">
      <div className="absolute z-0 pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <PlaceholderImage />
        <div className="w-64 my-16 text-left">
          <p className="my-4">
            Any math symbols you write here will be converted into LaTeX in your
            note on the right.
          </p>
          <p className="my-4">Typing inline LaTeX like <code>$$x=1$$</code> also works. Try it out!</p>
        </div>
      </div>
    </div>
  );
}
