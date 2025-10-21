import BookingForm from "@/components/forms/BookingForm";

async function getOrders() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function DashboardPage() {
  const mockUserId = "user_123";
  const mockCarId = "car_123";
  const orders = await getOrders();

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">세차 예약 시스템</h1>
      <BookingForm userId={mockUserId} carId={mockCarId} />

      <h2 className="text-2xl font-semibold mt-10 mb-4"> 예약 내역 </h2>
      <div className="border rounded p-4">
        {orders.length ? (
          <ul className="space-y-3">
            {orders.map((o: any) => (
              <li key={o.id} className="border-b pb-2">
                <p> 날짜: {new Date(o.date).toLocaleDateString()}</p>
                <p>시간: {o.timeSlot}</p>
                <p>서비스: {o.serviceType}</p>
                <p>
                  상태: <span className="font-semibold">{o.status}</span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>에약 내역이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
