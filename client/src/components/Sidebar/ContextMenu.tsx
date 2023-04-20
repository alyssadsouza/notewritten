type Props = {
  buttons: ContextMenuButtons[];
  coords: { x: number; y: number };
};

type ContextMenuButtons = {
  onClick: () => void;
  label: string;
  icon: React.ReactElement;
  disabled?: boolean;
};

export default function ContextMenu({ buttons, coords }: Props) {
  return (
    <div
      style={{ top: coords.y, left: coords.x }}
      className="fixed z-50 flex flex-col w-36 bg-white border shadow-md"
    >
      {buttons.map((button) => (
        <div key={button.label}>
          <button
            onClick={button.onClick}
            className="flex gap-2 w-full items-center justify-between hover:text-teal-400 transition-all disabled:text-gray-300"
            disabled={button.disabled}
          >
            <p className="p-2 text-left text-xs">{button.label}</p>
            {button.icon}
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
}
