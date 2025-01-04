import { prisma } from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId") || undefined;
    const formId = url.searchParams.get("formId") || undefined;

    if (!userId || !formId) {
      throw new Error("Id's not provided");
    }

    const delteResult = await prisma.form.delete({
      where: {
        id: formId,
        creatorID: userId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: delteResult,
        message: "form deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error while deleting Form!", error);
    return NextResponse.json(
      {
        success: false,
        message: "an Internal server error occured",
      },
      { status: 500 }
    );
  }
}
