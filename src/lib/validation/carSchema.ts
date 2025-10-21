import { z } from "zod";

export const carSchema = z.object({
  brand: z.string().min(1, "브랜드명을 입력하세요."),
  model: z.string().min(1, "모델명을 입력하세요."),
  year: z.string().optional(),
  size: z.enum(["SMALL", "MEDIUM", "LARGE"]),
  plate: z
    .string()
    .regex(/^[0-9]{2,3}[가-힣][0-9]{4}$/, "차량번호 형식이 올바르지 않습니다."),
  userId: z.string(),
});

export type CarInput = z.infer<typeof carSchema>;
