import { NextResponse } from "next/server";

import * as bcrypt from "bcrypt";

import db from "@/libs/prismadb";

export async function POST(request) {
  try {
    const data = await request.json();

    console.log(data);

    const usernameFound = await db.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (usernameFound) {
      return NextResponse.json(
        { message: "El usuario ya existe." },
        { status: 400 }
      );
    }

    const emailFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (emailFound) {
      return NextResponse.json(
        { message: "El correo ya existe." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await db.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
      },
    });

    const { password: _, ...user } = newUser;

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
