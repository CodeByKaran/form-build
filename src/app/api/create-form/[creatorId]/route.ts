import { prisma } from "@/lib/client";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Define the API route
export async function POST(
  req: NextRequest,
  { params }: { params: { creatorId: string } }
) {
  try {
    // Await params to ensure it's resolved before accessing the properties
    const { creatorId } = params;

    // Validate the creatorId
    if (!creatorId) {
      throw new Error("Invalid or missing creatorId");
    }

    const isValidUser = await prisma.user.findFirst({
      where: {
        id: creatorId,
      },
    });

    if (!isValidUser) {
      throw new Error("unauthorized access");
    }

    // Parse the form fields from the request body
    const formData = await req.json();

    const isFormNameSame = await prisma.form.findFirst({
      where: {
        creatorID: creatorId,
        formName: formData.formName,
      },
    });

    if (isFormNameSame) {
      throw new Error("form name is already in use");
    }

    // Validate the fields (optional)
    if (!formData.fields || typeof formData.fields !== "object") {
      throw new Error("Invalid fields data");
    }

    // Create the form in the database using Prisma
    const newForm: Prisma.FormCreateInput = {
      formName: formData.formName,
      fields: formData.fields,
      creator: {
        connect: { id: creatorId }, // Connect the form to the creator by ID
      },
    };

    // Save the new form to the database
    const form = await prisma.form.create({
      data: newForm,
    });

    // Return success response
    return NextResponse.json(
      { success: true, message: "Form created successfully", form },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
