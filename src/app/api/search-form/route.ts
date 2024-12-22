import { prisma } from "@/libs/client";
import { NextRequest, NextResponse } from "next/server";

export default async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const key = url.searchParams.get("key") || undefined;
    const userId = url.searchParams.get("userId") || undefined;

    const forms = await prisma.form.findMany({
      where: {
        creatorID: userId,
        formName: {
          startsWith: key,
        },
      },
      orderBy: {
        formName: "asc",
      },
      take: 20,
      select: {
        formName: true,
        id: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: forms,
        message: "form searched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error while searching forms", error);
    return NextResponse.json(
      {
        success: false,
        message: "an internal server error occured",
      },
      { status: 500 }
    );
  }
}
