import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic for SSR support

// import ReactApexChart from "react-apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const DiabetesRetinopathyPieChart = () => {
  const [diabetesData, setDiabetesData] = useState([]);
  const [retinopathyData, setRetinopathyData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const fetchDiabetesData = async () => {
      try {
        const response = await axios.get("http://155.248.225.224:8091/diabetes-data");
        setDiabetesData(response.data);
        calculatePieChart(response.data);
      } catch (error) {
        console.error("Error fetching diabetes data:", error);
      }
    };

    const fetchRetinopathyData = async () => {
      try {
        const response = await axios.get(
          "http://155.248.225.224:8091/retinopathy-data"
        );
        setRetinopathyData(response.data);
      } catch (error) {
        console.error("Error fetching retinopathy data:", error);
      }
    };

    fetchDiabetesData();
    fetchRetinopathyData();
  }, []);

  const calculatePieChart = (diabetesData) => {
    const totalPatients = diabetesData.length;
    const patientsWithRetinopathy = diabetesData.filter(
      (entry) => entry.prediction === 1
    ).length;

    const percentageWithRetinopathy =
      (patientsWithRetinopathy / totalPatients) * 100;
    const percentageWithoutRetinopathy = 100 - percentageWithRetinopathy;

    setPieChartData([percentageWithRetinopathy, percentageWithoutRetinopathy]);
  };

  const pieChartOptions = {
    chart: {
      type: "pie",
    },
    labels: ["With Retinopathy", "Without Retinopathy"],
    title: {
      text: "Diabetes Retinopathy Percentage",
      align: "left",
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      position: "bottom",
    },
  };

  return (
    <div className="pie-chart-container">
      <h3>Diabetes and Retinopathy Analysis</h3>
      <ReactApexChart
        options={pieChartOptions}
        series={pieChartData}
        type="pie"
        height={350}
      />
    </div>
  );
};

export default DiabetesRetinopathyPieChart;
