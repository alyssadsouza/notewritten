export default function NoNotebookOpen() {
  return (
    <div className="h-full text-slate-400 dark:text-neutral-600 flex flex-col items-center justify-center gap-4 w-64">
      <h1 className="text-5xl font-bold">⌘ N</h1>
      <h3 className="font-normal text-base">
        Create a new notebook with ⌘ N or open an existing notebook.
      </h3>
    </div>
  );
}
