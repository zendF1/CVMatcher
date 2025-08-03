import { scoreCV } from "@/lib/openai";
import { extractTextFromPDF } from "@/lib/pdf";

export async function POST(req: Request) {
    const formData = await req.formData();
    const jd = formData.get("jd") as File;
    const cv = formData.get("cv") as File;

    const jdBuffer = Buffer.from(await jd.arrayBuffer());
    const cvBuffer = Buffer.from(await cv.arrayBuffer());

    const [jdText, cvText] = await Promise.all([
        extractTextFromPDF(jdBuffer),
        extractTextFromPDF(cvBuffer),
    ]);

    const result = await scoreCV(jdText, cvText);
    return Response.json(result);
}
