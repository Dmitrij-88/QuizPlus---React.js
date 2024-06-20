import React from 'react'
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Pie, Doughnut} from "react-chartjs-2";

function DoughnutChart({chartData}) {
  return <Doughnut data={chartData}/>;
  
}

export default DoughnutChart;