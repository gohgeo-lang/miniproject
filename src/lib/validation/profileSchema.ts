import { z } from "zod";
export const profileSchema = z.object({
  phone: z
    .string()
    .regex(/^010-\d{4}-\d{4}$/, "전화번호 형식은 010-0000-0000 이어야 합니다."),
  address: z.string().min(3, "주소를 입력하세요."),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  userId: z.string(),
});

export type ProfileInput = z.infer<typeof profileSchema>;
