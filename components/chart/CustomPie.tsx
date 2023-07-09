import { Chart as ChartTS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartTS.register(ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    responsive: true,
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: "Users vs Post",
    },
  },
}

const generateBackgroundColor = [
  { id: 1, color: 'rgba(255, 99, 132, 0.5)' },
  { id: 2, color: 'rgba(54, 162, 235, 0.5)' },
  { id: 3, color: 'rgba(255, 206, 86, 0.5)' },
  { id: 4, color: 'rgba(75, 192, 192, 0.5)' },
];

const generateBorderColor = [
  { id: 1, color: 'rgba(255, 99, 132, 1)' },
  { id: 2, color: 'rgba(54, 162, 235, 1)' },
  { id: 3, color: 'rgba(255, 206, 86, 1)' },
  { id: 4, color: 'rgba(75, 192, 192, 1)' },
];

export default function CustomPie({ datas }: any) {
  const labels = ['account', 'thread', 'post'];
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset",
        data: datas,
        backgroundColor: generateBackgroundColor.map((item) => item.color),
        borderColor: generateBorderColor.map((item) => item.color),
        borderWidth: 1
      }
    ]
  }

  return (
    <Pie
      options={options}
      data={data}
    />
  )
}