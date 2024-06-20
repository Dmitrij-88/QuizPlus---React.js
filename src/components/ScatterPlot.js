import React from 'react'
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Pie, Doughnut, Scatter} from "react-chartjs-2";

function ScatterPlot({chartData}) {
  return <Scatter data={chartData}/>;
  
}

export default ScatterPlot;