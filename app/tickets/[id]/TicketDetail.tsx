import { Ticket } from "@prisma/client";
import React from "react";

type Props = {
  ticket: Ticket;
};

const TicketDetail = ({ ticket }: Props) => {
  return (
    <div>
      <p>{ticket.title}</p>
      <p>{ticket.description}</p>
    </div>
  );
};

export default TicketDetail;
