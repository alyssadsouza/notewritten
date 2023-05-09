import { ReactComponent as PlaceholderImage } from "../../assets/placeholder.svg";

export default function EquationEditor() {
  return (
    <div className="w-full h-full bg-white/75 dark:bg-neutral-700/50 dark:text-neutral-600 text-sm text-gray-300">
      <div className="absolute z-0 pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <PlaceholderImage className="dark:text-neutral-100" />
        <div className="w-64 my-16 text-left">
          <p className="my-4">
            Any math symbols you write here will be converted into LaTeX in your
            note on the right.
          </p>
          <p className="my-4">You can also type LaTeX with <code className="font-bold dark:bg-neutral-700 dark:text-neutral-500">CMD+SHIFT+M</code>. Try it out!</p>
        </div>
      </div>
    </div>
  );
}
