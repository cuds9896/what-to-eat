import React from "react";
import { useSortable } from "@dnd-kit/react/sortable";

export function IngredientDraggable({
  id,
  index,
  category,
}: {
  id: string;
  index: number;
  category: string;
}) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "ingredient",
    accept: "ingredient",
    group: category,
  });
  return (
    <div
      className="Item bg-gray-200 rounded-lg p-4 flex flex-col items-center gap-2 w-full mx-2"
      ref={ref}
      data-dragging={isDragging}
    >
      {id}
    </div>
  );
}
