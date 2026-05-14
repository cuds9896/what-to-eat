import React from "react";
import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";

export function IngredientCategory({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const { ref, isDropTarget } = useDroppable({
    id: id,
    type: "category",
    accept: ["ingredient", "category"],
    collisionPriority: CollisionPriority.Low,
  });
  const style = isDropTarget ? "bg-blue-100" : "";

  return (
    <div
      className={`Column bg-gray-100 rounded-lg p-4 flex flex-col items-center gap-2 w-full mx-2 ${style}`}
      ref={ref}
    >
      {children}
    </div>
  );
}
