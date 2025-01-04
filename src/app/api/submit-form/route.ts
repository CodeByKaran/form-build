import { prisma } from "@/lib/client";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const data = await req.json();

    const formDataInput: Prisma.FormdataCreateInput = {
      formBy: userId || "",
      data: data,
    };

    const submittedForm = await prisma.formdata.create({
      data: formDataInput,
    });

    return NextResponse.json(
      {
        success: true,
        message: "form submitted thankyou",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("error while submitting form", error);
    return NextResponse.json(
      {
        success: false,
        message: "an internal server errror occured",
      },
      { status: 500 }
    );
  }
}
