"use client";

import { useState } from "react";

export default function CarForm({ userId }: { userId: string }) {
  const [form, setForm] = useState({
    brand: "",
    model: "",
    size: "SMALL",
    plate: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/cars", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ ...form, userId }),
    });

    const data = await res.json();
    setMessage(data.error ? data.error : "차량 등록 완료!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 max-w-md mx-auto mt-8"
    >
      <h2 className="text-xl font-semibold mb-2">차량 등록</h2>
      <input
        type="text"
        placeholder="브랜드 (예: 현대)"
        value={form.brand}
        onChange={(e) => setForm({ ...form, brand: e.target.value })}
        className="border p-2 rounded"
      />
      <select
        value={form.size}
        onChange={(e) => setForm({ ...form, size: e.target.value })}
        className="border p-2 rounded"
      >
        <option value="SMALL">소형</option>
        <option value="MEDIUM">중형</option>
        <option value="LARGE">대형</option>
      </select>
      <input
        type="text"
        placeholder="차량번호 (예: 12가3456)"
        value={form.plate}
        onChange={(e) => setForm({ ...form, plate: e.target.value })}
        className="border p-2 rounded"
      />
      <button className="bg-green-500 flex-white py-2 rounded">등록하기</button>
      {message && (
        <p className="text-sm text-gray-600 text-center mt-2">{message}</p>
      )}
    </form>
  );
}
