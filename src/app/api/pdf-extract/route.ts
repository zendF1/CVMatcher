import { extractTextFromPDF } from "@/lib/pdf";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("pdf") as File;

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const extractedText = await extractTextFromPDF(buffer);
        return NextResponse.json({ text: extractedText });
    } catch (error) {
        console.error("Error extracting PDF:", error);
        return NextResponse.json(
            { error: "Failed to extract PDF content" },
            { status: 500 }
        );
    }
}
