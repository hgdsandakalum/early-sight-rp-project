"use client"; // This makes the component a Client Component

import React, { useState } from "react";
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
import axios from "axios";

// Define columns for meal recommendations
export const columns = [
  {
    accessorKey: "_id",
    header: "Meal ID",
  },
  {
    accessorKey: "action_name",
    header: "Recommended Meal",
  },
];

const response = axios.get("https://retina-care-recoomend-server-565418b38e96.herokuapp.com/api/v2/recommendations/get_all_actions");

const data = response.data;

console.log(data);
// Sample mockData for demonstration purposes
const mockData = [
  {
    "_id": 1,
    "action_name": "Rotti with lunu miris",
    "expert_1": [
        4,
        5,
        8,
        10
    ],
    "expert_2": [
        2,
        3,
        4
    ]
},
{
    "_id": 2,
    "action_name": "Brown rice with TOFU , and carrot salad",
    "expert_1": [
        5,
        6,
        7,
        11,
        12
    ],
    "expert_2": [
        2,
        3,
        4
    ]
},
{
    "_id": 3,
    "action_name": "Sweet potato and coconut scrapes",
    "expert_1": [
        1,
        4,
        7
    ],
    "expert_2": [
        1,
        2,
        3
    ]
},
{
    "_id": 4,
    "action_name": "Brown beans with onion mixture",
    "expert_1": [
        4,
        6
    ],
    "expert_2": [
        2
    ]
},
{
    "_id": 5,
    "action_name": "Egg White omelette  with bread",
    "expert_1": [
        1,
        7,
        9,
        10
    ],
    "expert_2": [
        1,
        3,
        4
    ]
},
{
    "_id": 6,
    "action_name": "1 cup of brown rice with sausages and dahl curry",
    "expert_1": [
        2,
        3,
        8
    ],
    "expert_2": [
        1,
        3
    ]
},
{
    "_id": 7,
    "action_name": "Vegetable- mixed noodles with salmon",
    "expert_1": [
        3
    ],
    "expert_2": [
        1
    ]
},
{
    "_id": 8,
    "action_name": "String Hoppers and Chicken curry",
    "expert_1": [
        1,
        3
    ],
    "expert_2": [
        1
    ]
},
{
    "_id": 9,
    "action_name": "Egg Hoppers",
    "expert_1": [
        7,
        9
    ],
    "expert_2": [
        3
    ]
},
{
    "_id": 10,
    "action_name": "oats- meal",
    "expert_1": [
        1
    ],
    "expert_2": [
        1
    ]
},
{
    "_id": 11,
    "action_name": "sweet corn soup with mint salad",
    "expert_1": [
        2,
        8,
        10
    ],
    "expert_2": [
        1,
        3,
        4
    ]
},
{
    "_id": 12,
    "action_name": "Butter bean pasta with tomato sauce",
    "expert_1": [
        12
    ],
    "expert_2": [
        4
    ]
},
{
    "_id": 13,
    "action_name": "lean Chicken and vegetable lettuce wraps",
    "expert_1": [
        2,
        8,
        9
    ],
    "expert_2": [
        1,
        4
    ]
},
{
    "_id": 14,
    "action_name": "Spicy BBQ pork",
    "expert_1": [
        2
    ],
    "expert_2": [
        1
    ]
},
{
    "_id": 15,
    "action_name": "Rice, soya meat and potatoes",
    "expert_1": [
        3,
        5,
        6,
        9,
        11,
        12
    ],
    "expert_2": [
        1,
        2,
        3,
        4
    ]
},
{
    "_id": 16,
    "action_name": "smoked markerel with banana bread",
    "expert_1": [
        2,
        3
    ],
    "expert_2": [
        2,
        3
    ]
}
];

// Modal Component
const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [mealName, setMealName] = useState("");
  const [isBreakfast, setIsBreakfast] = useState(false);
  const [isLunch, setIsLunch] = useState(false);
  const [isDinner, setIsDinner] = useState(false);
  const [calorieType, setCalorieType] = useState("low");
  const [vegetarian, setVegetarian] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Add New Meal</h2>
        <div className="space-y-4">
          {/* Meal Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Meal Name
            </label>
            <Input
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
                id="breakfast"
                checked={isBreakfast}
                onChange={() => setIsBreakfast(!isBreakfast)}
              />
              <label htmlFor="breakfast">Breakfast</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="lunch"
                checked={isLunch}
                onChange={() => setIsLunch(!isLunch)}
              />
              <label htmlFor="lunch">Lunch</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="dinner"
                checked={isDinner}
                onChange={() => setIsDinner(!isDinner)}
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
                  id="low"
                  name="calorieType"
                  value="low"
                  checked={calorieType === "low"}
                  onChange={() => setCalorieType("low")}
                />
                <label htmlFor="low" className="ml-2">
                  Low Calorie
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="high"
                  name="calorieType"
                  value="high"
                  checked={calorieType === "high"}
                  onChange={() => setCalorieType("high")}
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
                id="vegetarian"
                checked={vegetarian}
                onChange={() => setVegetarian(!vegetarian)}
              />
              <label htmlFor="vegetarian">Vegetarian</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="nonVegetarian"
                checked={!vegetarian}
                onChange={() => setVegetarian(false)}
              />
              <label htmlFor="nonVegetarian">Non Vegetarian</label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-2">
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button
              onClick={() => {
                onSubmit({
                  mealName,
                  mealType: { isBreakfast, isLunch, isDinner },
                  calorieType,
                  vegetarian,
                });
                onClose();
              }}
            >
              Add Meal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function RecommendationsView() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const table = useReactTable({
    data: mockData, // Use mockData or your fetched data
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
