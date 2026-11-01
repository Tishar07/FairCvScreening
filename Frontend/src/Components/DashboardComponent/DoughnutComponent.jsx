import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title
);

export default function DoughnutComponent() {
  const data = {
    labels: ["Shortlisted", "Rejected", "Pending"],

    datasets: [
      {
        label: "Cvs",
        data: [45, 60, 20],

        backgroundColor: [
          "#22C55E",
          "#EF4444",
          "#FACC15"
        ],

        borderColor: "#000000ff",
        borderWidth: 2,
        hoverOffset: 8,
        borderRadius: 5,
        spacing: 3
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "72%",

    plugins: {
      title: {
        display: true,
        text: "Screening Status",
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
        position: "bottom",
        labels: {
          color: "#CBD5E1",
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 8,
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
      <Doughnut data={data} options={options} />
    </div>
  );
}