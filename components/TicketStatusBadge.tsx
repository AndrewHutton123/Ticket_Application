import { Status } from "@prisma/client";
import React from "react";
import { Badge } from "./ui/badge";

type Props = {
  status: Status;
};

const statusMap: Record<
  Status,
  { label: string; colour: "bg-red-400" | "bg-yellow-400" | "bg-green-400" }
> = {
  OPEN: { label: "Open", colour: "bg-red-400" },
  STARTED: { label: "Started", colour: "bg-yellow-400" },
  CLOSED: { label: "Closed", colour: "bg-green-400" },
};

const TicketStatusBadge = ({ status }: Props) => {
  return (
    <Badge
      className={`${statusMap[status].colour} text-background hover:${statusMap[status].colour}`}
    >
      {statusMap[status].label}
    </Badge>
  );
};

export default TicketStatusBadge;
