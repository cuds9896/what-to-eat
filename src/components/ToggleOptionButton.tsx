import { useLayoutEffect, useRef, useState } from "react";

export default function ToggleOptionButton({
  options,
  bgColour,
  activeColour,
  onChange,
}: {
  options: string[];
  bgColour?: string;
  activeColour?: string;
  onChange?: (selectedOption: number) => void;
}) {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [highlight, setHighlight] = useState({ width: 0, left: 0 });

  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  useLayoutEffect(() => {
    const el1 = refs.current[selectedOption];
    if (el1) {
      setHighlight({ width: el1.offsetWidth, left: el1.offsetLeft - 4 });
    }
  }, [selectedOption]);

  return (
    <div className={`${bgColour} relative flex gap-1 rounded-lg p-1`}>
      <div
        className={`${activeColour} absolute top-1 bottom-1 rounded-md  shadow transition-all duration-300 ease-out`}
        style={{
          width: `${highlight.width}px`,
          transform: `translateX(${highlight.left}px)`,
        }}
      />

      {options.map((option, index) => (
        <button
          key={option}
          ref={(el) => {
            refs.current[index] = el;
          }}
          className="relative z-10 flex-1 rounded-md px-2 py-2 text-gray-700 transition-colors duration-300 ease-outfocus:outline-none"
          onClick={() => {
            setSelectedOption(index);
            onChange?.(index);
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
