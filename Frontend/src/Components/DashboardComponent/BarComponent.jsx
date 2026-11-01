
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarComponent() {
  const data = {
    labels: [
      "Engineering",
      "Human Resources",
      "Finance",
      "Operations",
      "Marketing"
    ],

    datasets: [
      {
        label: "Applications",
        data: [45, 28, 36, 19, 32],

        backgroundColor: "#22C55E",
        hoverBackgroundColor: "#4ADE80",

        borderRadius: 6,
        borderSkipped: false,
        barPercentage: 0.65,
        categoryPercentage: 0.8
      }
    ]
  };

  const options = {
    indexAxis: "y",

    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      title: {
        display: true,
        text: "Applications per Department",
        color: "#F8FAFC",
        font: {
          size: 18,
          weight: "600"
        },
        padding: {
          bottom: 24
        }
      },

      legend: {
        position: "top",
        labels: {
          color: "#CBD5E1",
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 8,
          padding: 16,
          font: {
            size: 12
          }
        }
      },

      tooltip: {
        backgroundColor: "#0F172A",
        titleColor: "#F8FAFC",
        bodyColor: "#CBD5E1",
        padding: 12,
        cornerRadius: 8,
        displayColors: true
      }
    },

    scales: {
      x: {
        beginAtZero: true,

        ticks: {
          color: "#CBD5E1",
          precision: 0,
          stepSize: 10
        },

        title: {
          display: true,
          text: "Number of Applications",
          color: "#CBD5E1"
        },

        grid: {
          color: "rgba(148, 163, 184, 0.12)"
        },

        border: {
          display: false
        }
      },

      y: {
        ticks: {
          color: "#CBD5E1",
          font: {
            size: 12
          }
        },

        grid: {
          display: false
        },

        border: {
          display: false
        }
      }
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "350px",
        padding: "20px",
        background: "linear-gradient(145deg, #1c1c1c, #292929)",
        border: "1px solid #3a3a3a",
        borderRadius: "16px",
        boxSizing: "border-box"
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
}
