import { Priority } from "@prisma/client";
import { Flame } from "lucide-react";
import React from "react";

type Props = {
  priority: Priority;
};

const TicketPriority = ({ priority }: Props) => {
  const priorityMap: Record<Priority, { label: string; level: 1 | 2 | 3 }> = {
    HIGH: { label: "High", level: 3 },
    MEDIUM: { label: "Meduim", level: 2 },
    LOW: { label: "Low", level: 1 },
  };

  return (
    <div className="flex justify-between">
      <Flame
        className={`${priorityMap[priority].level >= 1 ? "text-red-500" : ""}`}
      />
      <Flame
        className={`${priorityMap[priority].level >= 2 ? "text-red-500" : ""}`}
      />
      <Flame
        className={`${priorityMap[priority].level >= 3 ? "text-red-500" : ""}`}
      />
    </div>
  );
};

export default TicketPriority;
