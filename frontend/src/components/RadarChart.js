import React from 'react'
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Pie, Doughnut, Radar} from "react-chartjs-2";

function RadarChart({chartData}) {
  return <Radar data={chartData}/>;
  
}

export default RadarChart;