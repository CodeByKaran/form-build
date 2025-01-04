import { prisma } from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export default async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const pageSize = Number(url.searchParams.get("pageSize")) || 10;
    const page = Number(url.searchParams.get("page")) || 1;
    const lastRecordId = url.searchParams.get("lastRecordId");
    const userId = url.searchParams.get("userId") || undefined;

    let forms;

    if (lastRecordId) {
      forms = await prisma.form.findMany({
        take: pageSize,
        skip: 1,
        cursor: {
          id: lastRecordId,
        },
        where: {
          creatorID: userId,
        },
        select: {
          formName: true,
          id: true,
        },
      });
    } else {
      forms = await prisma.formdata.findMany({
        take: pageSize,
        where: {
          formBy: userId,
        },
        select: {
          formBy: true,
          id: true,
        },
      });
    }

    const totalResults = await prisma.formdata.count({
      where: {
        formBy: userId,
      },
    });

    const lastFormId =
      forms.length === pageSize ? forms[forms.length - 1].id : null;

    return NextResponse.json({
      success: true,
      data: {
        forms,
        lastFormId,
        page,
        pageSize,
        totalResults,
      },
      message: "Forms fetched successfully",
    });
  } catch (error) {
    console.error("Error while paginating submitted forms:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An internal server error occurred!",
      },
      { status: 500 }
    );
  }
}
