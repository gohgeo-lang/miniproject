"use client";
import { useState } from "react";

export default function ProfileForm({ userId }: { userId: string }) {
  const [form, setForm] = useState({
    phone: "",
    address: "",
  });

  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, userId }),
    });

    const data = await res.json();
    setMessage(data.error ? data.error : "프로필 등록 완료!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 max-w-md mx-auto mt-6"
    >
      <h2 className="text-xl font-semibold mb-2">고객정보등록</h2>
      <input
        type="text"
        placeholder="전화번호 (010-0000-0000)"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="주소"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        className="border p-2 rounded"
      />
      <button className="bg-blue-500 text-white py-2 rounded">등록하기</button>
      {message && (
        <p className="text-sm text-gray-600 text-center mt-2">{message}</p>
      )}
    </form>
  );
}
