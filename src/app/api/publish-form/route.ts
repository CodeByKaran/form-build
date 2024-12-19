import { prisma } from "@/libs/client";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId") || undefined;
    const formId = url.searchParams.get("formId") || undefined;

    if (!userId || !formId) {
      throw new Error("Id's not provided");
    }

    const {isPublished} = await req.json()

    const publsihedForm = await prisma.form.update({
      where: {
        id: formId,
        creatorID: userId,
      },
      data:{
        isPublished:isPublished
      }
    });

    return NextResponse.json(
      {
        success: true,
        data: publsihedForm,
        message: "form published successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error while publishing form", error);
    return NextResponse.json(
      {
        success: false,
        message: "an internal server error occured",
      },
      { status: 500 }
    );
  }
}
