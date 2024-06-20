import React from 'react'
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Pie} from "react-chartjs-2";

function BarChart({chartData}) {
  return <Bar data={chartData}/>;
  
}

export default BarChart;