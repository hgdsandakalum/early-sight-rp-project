"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  flexRender,
  SortingState,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnFiltersState,
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
import { Plus } from "lucide-react";
import { PatientAddModal } from "../../patients/_components/patient-add-modal";
import { RemoveDialog } from "../../patients/_components/RemoveDialog";
import AddNewSubscriptionModal from "./addNewSubscription";

const SubscriptionsTable = ({ columns }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const docId = await localStorage.getItem("userId");
      const response = await fetch(
        "http://localhost:3005/api/v1/doctor/subscriptions/" + docId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { data } = await response.json();

      const result = data?.map((item) => ({
        pId: item.user._id,
        subscriptionId: item._id,
        name: item.user.name,
        gender: item.user.gender,
        email: item.user.email,
        subscriptionType: item.subscriptionType,
        subscriptionStartDate: new Date(
          item.subscriptionStartDate
        ).toLocaleDateString(),
        subscriptionEndDate: new Date(
          item.subscriptionEndDate
        ).toLocaleDateString(),
      }));
      setData(result);
      return result;

      console.log(result);
      //   setData(result);
    } catch (error) {}
  };

  //   fetchData()
  useEffect(() => {
    const result = void fetchData();
    // setData(result)
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const table = useReactTable({
    data,
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
  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center">
          <Input
            placeholder="Search Patient ID"
            value={table.getColumn("patientID")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("patientID")?.setFilterValue(event.target.value)
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
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <AddNewSubscriptionModal />
        {/* <Dialog>
          <PatientAddModal />
          <DialogTrigger>
            <Button onClick={() => setIsModalOpen(true)}>
              <div className="flex">
                <Plus className="mr-1" />
                <span className="hidden sm:block">Add New Patient</span>
              </div>
            </Button>
          </DialogTrigger>
        </Dialog> */}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="text-xs sm:text-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
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
    </div>
  );
};

export default SubscriptionsTable;
