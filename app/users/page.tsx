import UserForm from "@/components/UserForm";
import React from "react";
import DataTableSimple from "./DataTableSimple";
import prisma from "@/prisma/db";

const Users = async () => {
  const users = await prisma.user.findMany();
  return (
    <div>
      <UserForm />
      <DataTableSimple users={users} />
    </div>
  );
};

export default Users;
