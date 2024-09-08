"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic for SSR support
// import ReactApexChart from "react-apexcharts";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DiabetesRetinopathyPieChart from "./DiabetesRetinopathyPieChart";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const RetinopathyPredictTable = () => {
  const [retinopathyData, setRetinopathyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const [comparisonChartData, setComparisonChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/retinopathy-data"
        );
        const transformedData = response.data.map((entry, index) => ({
          patient: `Patient ${index + 1}`,
          Gender:
            entry.data.Gender && entry.data.Gender[0]
              ? entry.data.Gender[0]
              : "N/A",
          DiabetesType:
            entry.data["Diabetes Type"] && entry.data["Diabetes Type"][0]
              ? entry.data["Diabetes Type"][0]
              : "N/A",
          YearsSinceDiagnosis:
            entry.data["Diagnosis Year"] && entry.data["Diagnosis Year"][0]
              ? 2024 - parseInt(entry.data["Diagnosis Year"][0], 10)
              : "N/A",
          DiastolicBP:
            entry.data["Diastolic BP"] && entry.data["Diastolic BP"][0]
              ? entry.data["Diastolic BP"][0]
              : "N/A",
          EstimatedAvgGlucose:
            entry.data["Estimated Avg Glucose (mg/dL)"] &&
            entry.data["Estimated Avg Glucose (mg/dL)"][0]
              ? entry.data["Estimated Avg Glucose (mg/dL)"][0]
              : "N/A",
          HbA1c:
            entry.data["HbA1c (mmol/mol)"] && entry.data["HbA1c (mmol/mol)"][0]
              ? entry.data["HbA1c (mmol/mol)"][0]
              : "N/A",
          SystolicBP:
            entry.data["Systolic BP"] && entry.data["Systolic BP"][0]
              ? entry.data["Systolic BP"][0]
              : "N/A",
        }));

        setRetinopathyData(transformedData);
        setLoading(false);

        // Prepare data for the comparison chart
        calculateComparisonChartData(transformedData);
      } catch (error) {
        console.error("Error fetching retinopathy data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateComparisonChartData = (data) => {
    const patients = data.map((entry) => entry.patient);
    const yearsSinceDiagnosisData = data.map(
      (entry) => parseFloat(entry.YearsSinceDiagnosis) || 0
    );
    const diastolicBPData = data.map(
      (entry) => parseFloat(entry.DiastolicBP) || 0
    );
    const estimatedGlucoseData = data.map(
      (entry) => parseFloat(entry.EstimatedAvgGlucose) || 0
    );
    const hbA1cData = data.map((entry) => parseFloat(entry.HbA1c) || 0);
    const systolicBPData = data.map(
      (entry) => parseFloat(entry.SystolicBP) || 0
    );

    setComparisonChartData({
      categories: patients,
      yearsSinceDiagnosisData,
      diastolicBPData,
      estimatedGlucoseData,
      hbA1cData,
      systolicBPData,
    });
  };

  const columns = [
    { accessorKey: "Gender", header: "Gender" },
    { accessorKey: "DiabetesType", header: "Diabetes Type" },
    { accessorKey: "YearsSinceDiagnosis", header: "Years Since Diagnosis" },
    { accessorKey: "DiastolicBP", header: "Diastolic BP" },
    {
      accessorKey: "EstimatedAvgGlucose",
      header: "Estimated Avg Glucose (mg/dL)",
    },
    { accessorKey: "HbA1c", header: "HbA1c (mmol/mol)" },
    { accessorKey: "SystolicBP", header: "Systolic BP" },
  ];

  const table = useReactTable({
    data: retinopathyData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  if (loading) return <p>Loading...</p>;

  // Multi-series line chart options
  const lineChartOptions = {
    chart: {
      type: "line",
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Comparison of Retinopathy Data",
      align: "left",
    },
    xaxis: {
      categories: comparisonChartData.categories || [],
      labels: {
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: "Values",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 1,
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
  };

  const lineChartSeries = [
    {
      name: "Years Since Diagnosis",
      data: comparisonChartData.yearsSinceDiagnosisData || [],
    },
    {
      name: "Diastolic BP",
      data: comparisonChartData.diastolicBPData || [],
    },
    {
      name: "Estimated Avg Glucose (mg/dL)",
      data: comparisonChartData.estimatedGlucoseData || [],
    },
    {
      name: "HbA1c (mmol/mol)",
      data: comparisonChartData.hbA1cData || [],
    },
    {
      name: "Systolic BP",
      data: comparisonChartData.systolicBPData || [],
    },
  ];

  return (
    <>
      <div>
        <h2>Retinopathy Data</h2>
        <div className="flex items-center justify-between py-4">
          <Input
            placeholder="Search"
            value={table.getColumn("Gender")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("Gender")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader className="text-xs sm:text-sm">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="text-xs sm:text-sm">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>

        {/* Line chart section for comparison */}
        <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-7 drop-shadow-md mt-8">
          <h5 className="text-l sm:text-xl font-semibold text-black dark:text-white">
            Comparison of Retinopathy Data
          </h5>
          <div>
            <div id="comparisonChart">
              <ReactApexChart
                options={lineChartOptions}
                series={lineChartSeries}
                type="line"
                height={350}
                width={"100%"}
              />
            </div>
          </div>
        </div>
        <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-7 drop-shadow-md mt-8">
          <DiabetesRetinopathyPieChart />
        </div>
      </div>
    </>
  );
};

export default RetinopathyPredictTable;
