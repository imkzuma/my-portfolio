import { Chart as ChartTS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartTS.register(
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: "Grafik Perbandingan",
    },
  },
}

const generateBackgroundColor = [
  { id: 1, color: 'rgba(255, 99, 132, 0.5)' },
  { id: 2, color: 'rgba(54, 162, 235, 0.5)' },
  { id: 3, color: 'rgba(255, 206, 86, 0.5)' },
  { id: 4, color: 'rgba(75, 192, 192, 0.5)' },
];

export default function CustomBar({ datas }: any) {
  const labels = ['account', 'thread', 'post'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset',
        data: datas,
        backgroundColor: generateBackgroundColor.map((item) => item.color),
      }
    ],
  };

  return (
    <Bar
      options={options}
      data={data}
    />
  )
}