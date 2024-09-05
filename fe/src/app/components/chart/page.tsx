import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartProps {
    populationData: { year: number; value: number }[];
}

function Chart({ populationData }: ChartProps) {

  const data = {
    labels: populationData?.map(item => item.year), 
    datasets: [
      {
        label: "Population",
        data: populationData?.map(item => item.value), 
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        barThickness: 25,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const, 
      },
      title: {
        display: true,
        text: "Population By Year",
      },
    },
  };


  return (
    <div className="w-[100%]">

      <div className="chart-container bg-white text-center w-11/12 mx-auto my-2 p-2">
        <div className="chart flex">
          <Bar data={data} options={options} />
        </div>
      </div>

    </div>
  );
}

export default Chart;