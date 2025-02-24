import { useDroppable } from "@dnd-kit/core";

export default function ItineraryDay({ id, title, children }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="p-4 mb-4 bg-white border rounded shadow">
      <h4 className="font-bold">{title}</h4>
      {children}
    </div>
  );
}
