import { z } from "zod";

export const orderSchema = z.object({
  date: z.string().min(1, "날짜를 선택하세요."),
  timeSlot: z.string().min(1, "시간대를 선택하세요."),
  serviceType: z.string().min(1, "서비스를 선택하세요."),
  totalPrice: z.number().min(1000, "금액이 올바르지 않습니다."),
  userId: z.string(),
  carId: z.string(),
});

export type OrderInput = z.infer<typeof orderSchema>;
