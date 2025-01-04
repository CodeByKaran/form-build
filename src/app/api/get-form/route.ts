import { prisma } from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const formId = url.searchParams.get("formId") || undefined;

    if (!formId) {
      throw new Error("form id not found ");
    }

    const form = await prisma.form.findFirst({
      where: {
        id: formId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: form,
        message: "form fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error while getting form", error);
    return NextResponse.json(
      {
        success: false,
        message: "an internal server error occured",
      },
      { status: 500 }
    );
  }
}
