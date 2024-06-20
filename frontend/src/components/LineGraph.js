import React from 'react'
import { Chart as ChartJS } from "chart.js/auto";
import { Line} from "react-chartjs-2";

function LineGraph({chartData}) {
  return <Line data={chartData}/>;
  
}

export default LineGraph;