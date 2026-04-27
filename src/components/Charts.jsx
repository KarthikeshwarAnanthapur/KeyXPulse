import {
  Chart as ChartJS,
  CategoryScale, LinearScale,
  PointElement, LineElement,
  Title, Tooltip, Legend, Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale,
  PointElement, LineElement,
  Title, Tooltip, Legend, Filler
);

const BASE_OPTIONS = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1E293B',
      titleColor: '#94A3B8',
      bodyColor: '#F8FAFC',
      padding: 10,
      cornerRadius: 10,
      displayColors: false,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#94A3B8', font: { family: 'Inter', size: 11 } },
      border: { display: false },
    },
    y: {
      beginAtZero: false,
      grid: { color: '#E8EDF5' },
      ticks: { color: '#94A3B8', font: { family: 'Inter', size: 11 } },
      border: { display: false },
    },
  },
  animation: { duration: 600, easing: 'easeInOutQuart' },
};

function makeDataset(data, border, bg) {
  return {
    data,
    borderColor: border,
    backgroundColor: bg,
    borderWidth: 2.5,
    pointBackgroundColor: border,
    pointRadius: 4,
    pointHoverRadius: 7,
    fill: true,
    tension: 0.42,
  };
}

export function WpmChart({ labels, data }) {
  return (
    <Line
      data={{ labels, datasets: [makeDataset(data, 'rgba(167,139,250,0.9)', 'rgba(167,139,250,0.12)')] }}
      options={BASE_OPTIONS}
    />
  );
}

export function AccChart({ labels, data }) {
  return (
    <Line
      data={{ labels, datasets: [makeDataset(data, 'rgba(134,239,172,0.9)', 'rgba(134,239,172,0.12)')] }}
      options={BASE_OPTIONS}
    />
  );
}
