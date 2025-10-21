import ProfileForm from "@/components/forms/ProfileForm";
import CarForm from "@/components/forms/CarForm";

export default function DashboardPage() {
  const mockUserId = "user_123";
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Carpoo 고객 등록</h1>
      <ProfileForm userId={mockUserId} />
      <CarForm userId={mockUserId} />
    </div>
  );
}
