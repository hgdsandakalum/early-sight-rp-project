"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpDown,
  MoreHorizontal,
  Copy,
  SquarePen,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PatientEditModal } from "./patient-edit-modal";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Patient } from "../../../../../types";

let patientID = "";

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "id",
    header: "Patient ID",
  },
  {
    accessorKey: "firstName",
    header: "Patient Name",
    cell: ({ row }: { row: Row<Patient> }) => {
      const fullName = row?.original?.firstName + " " + row?.original?.lastName;
      return fullName;
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  // {
  //   accessorKey: "conditions",
  //   header: () => <div className="">Conditions</div>,
  //   cell: ({ row }: { row: Row<Patient> }) => {
  //     const conditions = row?.original?.conditions || [];
  //     return (
  //       <div className="flex flex-col">
  //         {conditions.map((data: string, index: number) => (
  //           <span key={index}>{data}</span>
  //         ))}
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "conditions",
    header: "Conditions",
  },
  {
    accessorKey: "nextAppointment",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-xs sm:text-sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Next Appointment
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="pl-4">{row.original.nextAppointment}</div>;
    },
  },
  {
    accessorKey: "joinedDate",
    header: "Joined Date",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }: { row: Row<Patient> }) => {
      const patient = row.original;
      const [isRemoveDialog, setIsRemoveDialog] = useState(false);
      const [isEditDialog, setIsEditDialog] = useState(false);
      const [patientData, setPatientData] = useState<Patient | null>(null);

      const removePatient = (id: string) => {
        setIsRemoveDialog(true);
        patientID = id;
      };

      const editPatient = (data: Patient) => {
        setIsEditDialog(true);
        setPatientData(data);
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(patient.id)}
              >
                <Copy className="mr-2 w-5" />
                Copy
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editPatient(patient)}>
                <SquarePen className="mr-2 w-5" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => removePatient(patient.id)}>
                <Trash2 className="mr-2 w-5" />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Edit Dialog */}
          {patientData && (
            <PatientEditModal
              open={isEditDialog}
              data={patientData}
              setIsEditDialog={setIsEditDialog}
            />
          )}
          {/* Remove Dialog */}
          <Dialog open={isRemoveDialog}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Patient Details</DialogTitle>
                <DialogDescription>
                  Are you really want to remove the patient({patientID}) ?
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="sm:justify-start">
                <Button type="button">Yes</Button>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setIsRemoveDialog(false)}
                  >
                    No
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
