import React from "react";
import prisma from "@/prisma/db";
import DataTable from "./DataTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Pagination from "@/components/Pagination";
import { Status, Ticket } from "@prisma/client";
import StatusFilter from "@/components/StatusFilter";

export type SearchParams = {
  status: Status;
  page: string;
  orderBy: keyof Ticket;
};

const Tickets = async ({ searchParams }: { searchParams: SearchParams }) => {
  const pageSize = 10;
  const page = parseInt(searchParams.page) || 1;

  const orderBy = searchParams.orderBy ? searchParams.orderBy : "createdAt";

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  let whereQuery = {};

  if (status) {
    whereQuery = {
      status: status,
    };
  } else {
    whereQuery = {
      NOT: [{ status: "CLOSED" }],
    };
  }

  const ticketCount = await prisma.ticket.count({ where: whereQuery });

  const tickets: Ticket[] = await prisma.ticket.findMany({
    where: whereQuery,
    take: pageSize,
    skip: (page - 1) * pageSize,
    orderBy: {
      [orderBy]: "desc",
    },
  });

  return (
    <div>
      <div className="flex gap-2">
        <Link
          href="/tickets/new"
          className={buttonVariants({ variant: "default" })}
        >
          Create New Ticket
        </Link>
        <StatusFilter />
      </div>
      <DataTable tickets={tickets} searchParams={searchParams} />
      <Pagination
        itemCount={ticketCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};

export default Tickets;
