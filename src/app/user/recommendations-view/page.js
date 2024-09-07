"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
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
} from "@/components/ui/table"; // Adjust the import path based on your project structure
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { getRecommendations, addMeals } from "@/services";
import { useRouter } from "next/navigation";

// Define columns for meal recommendations
const columns = [
  {
    accessorKey: "_id",
    header: "Meal ID",
  },
  {
    accessorKey: "action_name",
    header: "Recommended Meal",
  },
];

// Modal Component
const Modal = ({ isOpen, onClose, onSubmit }) => {
  const router = useRouter();
  const [mealName, setMealName] = useState("");
  const [isBreakfast, setIsBreakfast] = useState(false);
  const [isLunch, setIsLunch] = useState(false);
  const [isDinner, setIsDinner] = useState(false);
  const [calorie, setCalorie] = useState("high");
  const [calorieType, setCalorieType] = useState("low");
  const [vegetarian, setVegetarian] = useState(false);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [selectedVegStatus, setSelectedVegStatus] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  const calorieMap = { high: 0, low: 6 };
  const mealMap = { breakfast: 0, lunch: 1, dinner: 2 };
  const vegetarianMap = { nonVegetarian: 0, vegetarian: 3 };

  if (!isOpen) return null;

  const handleMealChange = (event) => {
    const { value, checked } = event.target;
    setSelectedMeals((prev) =>
      checked ? [...prev, value] : prev.filter((meal) => meal !== value)
    );
  };

  const handleVegStatusChange = (event) => {
    const { value, checked } = event.target;
    setSelectedVegStatus((prev) =>
      checked ? [...prev, value] : prev.filter((veg) => veg !== value)
    );
  };

  const getStates = () => {
    const matchingStates = [];
    console.log("selectedMeals", selectedMeals);
    console.log("calorie", calorie);
    console.log("selectedVegStatus", selectedVegStatus);

    selectedMeals.forEach((meal) => {
      selectedVegStatus.forEach((vegStatus) => {
        const baseIndex =
          calorieMap[calorie] + mealMap[meal] + vegetarianMap[vegStatus];
        matchingStates.push(baseIndex + 1); // 1-based index
      });
    });
    return matchingStates;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const statesArray = getStates();

    const result = addRecommendations(mealName, statesArray);
    onClose();
    router.refresh();
  };

  const addRecommendations = async (mealName, statesArray) => {
    try {
      const data = await addMeals(mealName, statesArray);
      return data;
    } catch (error) {
      console.error("Error adding data: ", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4">Add New Meal</h2>
          <div className="space-y-4">
            {/* Meal Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Meal Name
              </label>
              <Input
                type="text"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                placeholder="Enter meal name"
              />
            </div>

            {/* Meal Type (Checkboxes) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Meal Type
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value="breakfast"
                  onChange={handleMealChange}
                />
                <label htmlFor="breakfast">Breakfast</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="lunch"
                  value="lunch"
                  onChange={handleMealChange}
                />
                <label htmlFor="lunch">Lunch</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="dinner"
                  value="dinner"
                  onChange={handleMealChange}
                />
                <label htmlFor="dinner">Dinner</label>
              </div>
            </div>

            {/* Calorie Type (Radio Buttons) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Calorie Type
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    value="low"
                    checked={calorie === "low"}
                    onChange={(e) => setCalorie(e.target.value)}
                  />
                  <label htmlFor="low" className="ml-2">
                    Low Calorie
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    value="high"
                    checked={calorie === "high"}
                    onChange={(e) => setCalorie(e.target.value)}
                  />
                  <label htmlFor="high" className="ml-2">
                    High Calorie
                  </label>
                </div>
              </div>
            </div>

            {/* Vegetarian Preference (Checkbox) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vegetarian Preference
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value="vegetarian"
                  onChange={handleVegStatusChange}
                />
                <label htmlFor="vegetarian">Vegetarian</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value="nonVegetarian"
                  onChange={handleVegStatusChange}
                />
                <label htmlFor="nonVegetarian">Non Vegetarian</label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-2">
              <Button onClick={onClose} variant="outline">
                Cancel
              </Button>
              <Button type="submit">{isSaved ? "" : ""}Add Meal</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Component
export default function RecommendationsView() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await getRecommendations();
        setRecommendations(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchRecommendations();
  }, []);

  const table = useReactTable({
    data: recommendations, // Use mockData or your fetched data
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

  const handleAddMeal = (newMeal) => {
    console.log("New Meal Added:", newMeal);
    // You can handle adding the meal to your table data here.
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Meal Recommendations</h1>

      {/* Search Input and Add New Meal Button */}
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center">
          <Input
            placeholder="Search Meal ID"
            value={table.getColumn("_id")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("_id")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="-ml-8"
          >
            <path
              d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
              stroke="#cbd5e1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <div className="flex">
            <Plus className="mr-1" />
            <span className="hidden sm:block">Add New Meal</span>
          </div>
        </Button>
      </div>

      {/* Table */}
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

      {/* Pagination Controls */}
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

      {/* Modal for Adding New Meal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddMeal}
      />
    </div>
  );
}
