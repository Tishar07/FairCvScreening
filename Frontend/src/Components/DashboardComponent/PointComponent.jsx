
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PointComponent() {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July"
    ],

    datasets: [
      {
        label: "Applications",
        data: [12, 19, 8, 15, 34, 51, 33],

        // Line styling
        borderColor: "#22C55E",
        borderWidth: 3,
        tension: 0.4,

        // Point styling
        pointBackgroundColor: "#22C55E",
        pointBorderColor: "#1C1C1C",
        pointBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 9,
        pointHoverBackgroundColor: "#4ADE80",
        pointHoverBorderColor: "#FFFFFF",

        // Area styling
        fill: true,
        backgroundColor: "rgba(34, 197, 94, 0.08)"
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      title: {
        display: true,
        text: "Monthly Applications",
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
          padding: 16
        }
      },

      tooltip: {
        backgroundColor: "#0F172A",
        titleColor: "#F8FAFC",
        bodyColor: "#CBD5E1",
        padding: 12,
        cornerRadius: 8
      }
    },

    scales: {
      x: {
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
      },

      y: {
        beginAtZero: true,
        ticks: {
          color: "#CBD5E1",
          precision: 0,
          padding: 8
        },
        grid: {
          color: "rgba(148, 163, 184, 0.12)"
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
      <Line data={data} options={options} />
    </div>
  );
}
