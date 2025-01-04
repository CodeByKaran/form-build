import { prisma } from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId") || undefined;
    const formId = url.searchParams.get("formId") || undefined;

    if (!userId || !formId) {
      throw new Error("Id's not provided");
    }

    const newFields = await req.json();

    const updatedForm = await prisma.form.update({
      where: {
        creatorID: userId,
        id: formId,
      },
      data:{
        fields:newFields
      }
    });

    return NextResponse.json(
      {
        success: true,
        data: updatedForm,
        message: "form updated succesfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error while editing form ", error);
    return NextResponse.json(
      {
        success: false,
        message: "an internal server error occured",
      },
      { status: 500 }
    );
  }
}
