import options from "@/app/api/auth/[...nextauth]/options";
import UserForm from "@/components/UserForm";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth/next";
import React from "react";

type Props = {
  params: { id: string };
};

const EditUser = async ({ params }: Props) => {
  const session = await getServerSession(options);

  if (session?.user.role !== "ADMIN") {
    return <p className="text-destructive">Admin access required</p>;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!user) {
    return <p className="text-destructive">User not Found</p>;
  }

  user.password = "";

  return <UserForm user={user} />;
};

export default EditUser;
