type Props = {
	coords: {x: number, y: number};
	id: string;
	deleteFunction: (id: string) => void;
	renameFunction: (id: string) => void;
	downloadFunction: (id: string) => void;
  };
  
  export default function ContextMenu({ coords, id, deleteFunction, renameFunction, downloadFunction }: Props) {
	return (
	  <div style={{"top": coords.y, "left": coords.x}} className="absolute z-50 flex flex-col w-36 bg-white border">
		<button className="p-2 text-sm hover:text-sky-400 transition-all" onClick={() => downloadFunction(id)}>Download</button>
		<hr />
		<button className="p-2 text-sm hover:text-sky-400 transition-all" onClick={() => renameFunction(id)}>Rename</button>
		<hr />
		<button className="p-2 text-sm hover:text-sky-400 transition-all" onClick={() => deleteFunction(id)}>Delete</button>
	  </div>
	);
  }
  