import { userSchema } from "@/ValidationSchemas/users";
import prisma from "@/prisma/db";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: { id: string };
};

export async function PATCH(request: NextRequest, { params }: Props) {
  const body: User = await request.json();
  const validation = userSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return NextResponse.json({ error: "User not Found" }, { status: 404 });
  }

  if (body?.password && body.password !== "") {
    const hashPassword = await bcrypt.hash(body.password, 10);
    body.password = hashPassword;
  }
  //  else {
  //   delete body.password;
  // }

  if (user.username !== body.username) {
    const duplicateUsername = await prisma.user.findUnique({
      where: { username: body.username },
    });

    if (duplicateUsername) {
      return NextResponse.json(
        { message: "Duplicate Username" },
        { status: 409 }
      );
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      ...body,
    },
  });

  return NextResponse.json(updatedUser);
}
