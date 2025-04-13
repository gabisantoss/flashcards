import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0b0b0b", "#8b5cf6"];

import { useFlashcardContext } from "@/context/FlashcardContext";

const FlashcardCharts: React.FC = () => {
  const { flashcards } = useFlashcardContext();

  const studied = flashcards.filter((f) => f.status === "studied").length;
  const toStudy = flashcards.filter((f) => f.status === "to-study").length;
  const total = flashcards.length;

  const data = [
    { name: "Studied", value: studied },
    { name: "To Study", value: toStudy },
  ];

  return (
    <>
      {total === 0 ? (
        <p className="text-center text-gray-500">No flashcards available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default FlashcardCharts;
