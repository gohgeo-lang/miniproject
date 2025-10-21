"use client";

import { useState } from "react";

interface BookingFormProps {
  userId: string;
  carId: string;
}

export default function BookingForm({ userId, carId }: BookingFormProps) {
  const [form, setForm] = useState({
    date: "",
    timeSlot: "",
    serviceType: "",
    totalPrice: 0,
  });

  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, userId, carId }),
    });

    const data = await res.json();
    setMessage(data.error ? data.error : "예약이 완료되었습니다!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 flex flex-col gap-3"
    >
      <h2 className="text-xl font-semibold mb-2">세차 예약하기</h2>

      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="border p-2 rounded"
      />

      <select
        value={form.timeSlot}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="border p-2 rounded"
      />

      <select
        value={form.timeSlot}
        onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}
        className="border p-2 rounded"
      >
        <option value="">시간 선택</option>
        <option value="08:00~10:00">08:00~10:00</option>
        <option value="10:00~12:00">10:00~12:00</option>
        <option value="13:00~15:00">13:00~15:00</option>
        <option value="15:00~17:00">15:00~17:00</option>
      </select>

      <select
        value={form.serviceType}
        onChange={(e) => {
          const type = e.target.value;
          const price =
            type === "프리미엄" ? 35000 : type === "스탠다드" ? 25000 : 15000;
          setForm({ ...form, serviceType: type, totalPrice: price });
        }}
        className="border p-2 rounded"
      >
        <option value="">서비스 선택</option>
        <option value="배아직">베이직</option>
        <option value="스탠다드">스탠다드</option>
        <option value="프리미엄">프리미엄</option>
      </select>

      <p className="text-gray-600">
        예상 결제금액: <strong> {form.totalPrice.toLocaleString()}원</strong>
      </p>
      <button className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
        예약하기
      </button>

      {message && (
        <p className="text-sm text-gray-600 text-center mt-2">{message}</p>
      )}
    </form>
  );
}
