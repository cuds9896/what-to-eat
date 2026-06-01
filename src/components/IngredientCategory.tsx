import React from "react";
import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";

export function IngredientCategory({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id: string;
  className?: string;
}) {
  const { ref } = useDroppable({
    id: id,
    type: "category",
    accept: ["ingredient", "category"],
    collisionPriority: CollisionPriority.Low,
  });

  return (
    <div
      className={`Column rounded-lg p-4 flex flex-col items-center gap-2 w-full mx-2 ${className}`}
      ref={ref}
    >
      {children}
    </div>
  );
}
