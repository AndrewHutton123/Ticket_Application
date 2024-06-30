import React from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import prisma from "@/prisma/db";

type Props = {
  params: {
    id: string;
  };
};

const TicketForm = dynamic(() => import("@/components/TicketForm"), {
  ssr: false,
});

const EditTicket = async ({ params }: Props) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket) {
    return <p className="text-destructive">Ticket Not Found!</p>;
  }
  return <TicketForm ticket={ticket} />;
};

export default EditTicket;
