import { ScoreResult, ScoreResultSchema } from "@/types/score";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat"; // 👈 import kiểu chính xác

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function scoreCV(jd: string, cv: string): Promise<ScoreResult> {
    const messages: ChatCompletionMessageParam[] = [
        {
            role: "system",
            content:
                "You are an AI assistant that evaluates how well a CV matches a job description (JD). Your response must be a JSON object with specific scoring fields.",
        },
        {
            role: "user",
            content: `
Evaluate the CV against the JD based on the following criteria and return a JSON object with these exact fields:

Scoring Criteria:
1. skill_match: Skill match score (0-30)
2. experience_match: Experience relevance score (0-30)
3. education_match: Education match score (0-10)
4. keyword_match: Keyword alignment score (0-20)
5. presentation_score: CV presentation and clarity (0-10)
6. total_score: Total score (0-100)
7. comments: Detailed feedback and suggestions for improvement

---

JD:
${jd}

CV:
${cv}

Return response strictly as a JSON object like this:
{
  "skill_match": 25,
  "experience_match": 20,
  "education_match": 8,
  "keyword_match": 15,
  "presentation_score": 9,
  "total_score": 77,
  "comments": "The candidate has relevant Java and Spring Boot skills, but lacks experience with microservices. The CV is clearly presented. Recommend adding recent project details."
}
`,
        },
    ];

    const chat = await openai.chat.completions.create({
        model: "gpt-4o",
        messages,
        response_format: {
            type: "json_object",
        },
        temperature: 0.3,
    });

    const raw = chat.choices[0].message.content ?? "{}";

    let parsed;
    try {
        parsed = JSON.parse(raw);
    } catch (err) {
        throw new Error("OpenAI response is not valid JSON.");
    }

    const result = ScoreResultSchema.safeParse(parsed);
    if (!result.success) {
        console.error("❌ Zod validation error:", result.error);
        throw new Error("OpenAI response format is invalid.");
    }

    return result.data;
}
