// src/lib/pdf.ts
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
    const data = await pdfParse(buffer);
    return data.text.trim();
}
