import { z } from "zod";

export const ScoreResultSchema = z.object({
    skill_match: z.number().min(0).max(30),
    experience_match: z.number().min(0).max(30),
    education_match: z.number().min(0).max(10),
    keyword_match: z.number().min(0).max(20),
    presentation_score: z.number().min(0).max(10),
    total_score: z.number().min(0).max(100),
    comments: z.string(),
});

// 👇 Dùng để type-safe trong TypeScript
export type ScoreResult = z.infer<typeof ScoreResultSchema>;
