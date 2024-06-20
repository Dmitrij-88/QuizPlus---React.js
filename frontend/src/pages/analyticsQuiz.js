import '../Styles/analyticsQuiz.css'
import BarChart from "../components/BarChart";
import DoughnutChart from "../components/DoughnutChart";
import LineGraph from "../components/LineGraph";
import RadarChart from "../components/RadarChart";
import ScatterPlot from "../components/ScatterPlot";
import {UserData} from "../components/Data";
import { useState} from 'react';
import { Chart as ChartJS } from "chart.js/auto";


const AnalyticsQuiz = () => {


    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [{
          label: "Quizzes Completed",
          data: UserData.map((data) => data.quizcompleted),
          backgroundColor: ["#6a00fc"],
          borderColor: "black",
          borderWidth: 2,
        },
        {
            label: "Surveys Completed",
            data: UserData.map((data) => data.surveycompleted),
            backgroundColor: ["#ff0e93"],
            borderColor: "black",
            borderWidth: 2,
        },
        {
            label: "Total Correct Answers",
            data: UserData.map((data) => data.anscorrect),
            backgroundColor: ["#ffa10c"],
            borderColor: "black",
            borderWidth: 2,
        },
        {
            label: "Total Wrong Answers",
            data: UserData.map((data) => data.answrong),
            backgroundColor: ["#ff4360"],
            borderColor: "black",
            borderWidth: 2,
        },
        ],
      })


    return(
        <div className='analyseQuiz'>

            <h1 style = {{width:1000, paddingBottom: 50}}> Your Quiz Analytics</h1>
          <h2>Bar Chart</h2>
          <div style = {{width:1000, paddingBottom: 50}}><BarChart chartData={userData}/></div>
          <h2>Line Graph</h2>
          <div style = {{width:1000, paddingbottom: 50}}><LineGraph chartData={userData}/></div>
          <h2>Doughnut Chart</h2>
          <div style = {{width:1000, paddingbottom: 50}}><DoughnutChart chartData={userData}/></div>
          <h2>Radar Chart</h2>
          <div style = {{width:1000, paddingbottom: 50}}><RadarChart chartData={userData}/></div>
          <h2>Scatter Plot</h2>
          <div style = {{width:1000, paddingbottom: 50}}><ScatterPlot chartData={userData}/></div>
          

        </div>
    )
}

export default AnalyticsQuiz