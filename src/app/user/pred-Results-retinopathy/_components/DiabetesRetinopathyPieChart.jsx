import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DiabetesRetinopathyPieChart = () => {
  const [diabetesData, setDiabetesData] = useState([]);
  const [pieChartData, setPieChartData] = useState({
    labels: ["With Retinopathy", "Without Retinopathy"],
    datasets: [
      {
        label: "Retinopathy Percentage",
        data: [0, 0],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  });

  useEffect(() => {
    const fetchDiabetesData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/diabetes-data");
        setDiabetesData(response.data);
        calculatePieChart(response.data);
      } catch (error) {
        console.error("Error fetching diabetes data:", error);
      }
    };

    fetchDiabetesData();
  }, []);

  const calculatePieChart = (diabetesData) => {
    const totalPatients = diabetesData.length;
    const patientsWithRetinopathy = diabetesData.filter(
      (entry) => entry.prediction === 1
    ).length;

    const percentageWithRetinopathy =
      (patientsWithRetinopathy / totalPatients) * 100;
    const percentageWithoutRetinopathy = 100 - percentageWithRetinopathy;

    setPieChartData({
      labels: ["With Retinopathy", "Without Retinopathy"],
      datasets: [
        {
          label: "Retinopathy Percentage",
          data: [percentageWithRetinopathy, percentageWithoutRetinopathy],
          backgroundColor: ["#FF6384", "#36A2EB"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB"],
        },
      ],
    });
  };

  return (
    <div className="pie-chart-container" style={{ width: "300px", height: "300px" }}>
      <h3>Diabetes and Retinopathy Analysis</h3>
      <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default DiabetesRetinopathyPieChart;
