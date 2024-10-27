import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DiabetesRetinopathyPieChart = () => {
  const [diabetesData, setDiabetesData] = useState([]);
  const [pieChartData, setPieChartData] = useState({
    labels: ["Diabetes With Retinopathy", "Diabetes Without Retinopathy"],
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
        const response = await axios.get(
          "https://324aprj.sliit.eye.retino.zeuscorp.co/diabetes-data"
        );
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
      labels: ["Diabetes With Retinopathy", "Diabetes Without Retinopathy"],
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
    <div
      className="pie-chart-container flex items-center justify-between space-x-4"
      style={{ width: "100%", maxWidth: "700px", height: "300px" }}
    >
      <div className="flex flex-col justify-center w-1/2">
        <h2 className="text-l sm:text-xl font-semibold text-black dark:text-white text-center sm:text-left">
          Diabetes and Retinopathy Analysis
        </h2>
      </div>

      <div className="w-1/2" style={{ width: "350px", height: "320px" }}>
        <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default DiabetesRetinopathyPieChart;
