import FlashcardsTable from "@/components/FlashcardsTable";
import PlatformLayout from "@/components/layouts/PlatformLayout";

export default function DashboardPage() {
  return (
    <PlatformLayout>
      <h2 className="text-2xl font-semibold mb-6 ">Dashboard</h2>
      <FlashcardsTable />
    </PlatformLayout>
  );
}
