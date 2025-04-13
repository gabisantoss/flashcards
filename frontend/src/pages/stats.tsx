import FlashcardCharts from "@/components/FlashcardCharts";
import PlatformLayout from "@/components/layouts/PlatformLayout";

const StatsPage: React.FC = () => (
  <PlatformLayout>
    <h2 className="text-2xl font-semibold mb-6 ">Your Stats</h2>
    <FlashcardCharts />
  </PlatformLayout>
);

export default StatsPage;
