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

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const DiabetesTable = () => {
  const [diabetesData, setDiabetesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const [comparisonChartData, setComparisonChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://155.248.225.224:8091/diabetes-data");
        const transformedData = response.data.map((entry, index) => ({
          patient: `Patient ${index + 1}`,
          Pregnancies: entry.data[0],
          Glucose: entry.data[1],
          BloodPressure: entry.data[2],
          SkinThickness: entry.data[3],
          Insulin: entry.data[4],
          BMI: entry.data[5],
          DiabetesPedigreeFunction: entry.data[6],
          Age: entry.data[7],
          Outcome: entry.prediction === 1 ? "Positive" : "Negative",
        }));

        setDiabetesData(transformedData);
        setLoading(false);

        // Prepare data for the comparison chart
        calculateComparisonChartData(transformedData);
      } catch (error) {
        console.error("Error fetching diabetes data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateComparisonChartData = (data) => {
    const patients = data.map((entry) => entry.patient);
    const glucoseData = data.map((entry) => parseFloat(entry.Glucose) || 0);
    const bloodPressureData = data.map(
      (entry) => parseFloat(entry.BloodPressure) || 0
    );
    const bmiData = data.map((entry) => parseFloat(entry.BMI) || 0);
    const ageData = data.map((entry) => parseFloat(entry.Age) || 0);

    setComparisonChartData({
      categories: patients,
      glucoseData,
      bloodPressureData,
      bmiData,
      ageData,
    });
  };

  const columns = [
    { accessorKey: "Pregnancies", header: "Pregnancies" },
    { accessorKey: "Glucose", header: "Glucose" },
    { accessorKey: "BloodPressure", header: "Blood Pressure" },
    { accessorKey: "SkinThickness", header: "Skin Thickness" },
    { accessorKey: "Insulin", header: "Insulin" },
    { accessorKey: "BMI", header: "BMI" },
    {
      accessorKey: "DiabetesPedigreeFunction",
      header: "Diabetes Pedigree Function",
    },
    { accessorKey: "Age", header: "Age" },
    { accessorKey: "Outcome", header: "Outcome" },
  ];

  const table = useReactTable({
    data: diabetesData,
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
      text: "Comparison of Diabetes Data",
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
      name: "Glucose",
      data: comparisonChartData.glucoseData || [],
    },
    {
      name: "Blood Pressure",
      data: comparisonChartData.bloodPressureData || [],
    },
    {
      name: "BMI",
      data: comparisonChartData.bmiData || [],
    },
    {
      name: "Age",
      data: comparisonChartData.ageData || [],
    },
  ];

  return (
    <>
      <div>
        <h2>Diabetes Data</h2>
        <div className="flex items-center justify-between py-4">
          <Input
            placeholder="Search"
            value={table.getColumn("Pregnancies")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("Pregnancies")?.setFilterValue(event.target.value)
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
            Comparison of Diabetes Data
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
      </div>
    </>
  );
};

export default DiabetesTable;
