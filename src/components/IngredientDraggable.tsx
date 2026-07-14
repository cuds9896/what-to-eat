import { useSortable } from "@dnd-kit/react/sortable";
import { GripVertical } from "lucide-react";

export function IngredientDraggable({
  id,
  index,
  category,
}: {
  id: string;
  index: number;
  category: string;
}) {
  const { ref, isDragging, handleRef } = useSortable({
    id,
    index,
    type: "ingredient",
    accept: "ingredient",
    group: category,
  });
  return (
    <div
      className={`Item rounded-lg p-4 flex flex-row items-center gap-2 w-full justify-between bg-white shadow-md cursor-move ${isDragging ? "opacity-50" : ""}`}
      ref={ref}
      data-dragging={isDragging}
    >
      {id}
      <button
        ref={handleRef}
        className={`py-1 px-2 rounded-lg transition hover:bg-gray-200 ${isDragging ? "bg-gray-300" : "bg-gray-100"}`}
      >
        <GripVertical></GripVertical>
      </button>
    </div>
  );
}
