import { Prisma } from "@prisma/client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import TicketStatusBadge from "./TicketStatusBadge";
import Link from "next/link";
import TicketPriority from "./TicketPriority";

type TicketWithUser = Prisma.TicketGetPayload<{
  include: {
    assignedToUser: true;
  };
}>;

type Props = {
  tickets: TicketWithUser[];
};

const DashRecentTickets = ({ tickets }: Props) => {
  return (
    <Card className="col-span">
      <CardHeader>
        <CardTitle>Recently Updated</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-8">
          {tickets
            ? tickets.map((ticket) => (
                <div className="flex items-center" key={ticket.id}>
                  <TicketStatusBadge status={ticket.status} />
                  <div className="ml-4 space-y-1">
                    <Link href={`/tickets/${ticket.id}`}>
                      <p>{ticket.title}</p>
                      <p>{ticket.assignedToUser?.name}</p>
                    </Link>
                  </div>
                  <div className="ml-auto font-medium">
                    <TicketPriority priority={ticket.priority} />
                  </div>
                </div>
              ))
            : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashRecentTickets;
