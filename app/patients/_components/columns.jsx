"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { RemoveDialog } from "./RemoveDialog";

// let isRemoveDialog = false;
let patientID = "";

// const [isRemoveDialog, setIsRemoveDialog] = useState(false);

export const columns = [
  {
    accessorKey: "patientID",
    header: "Patient ID",
  },
  {
    accessorKey: "patientName",
    header: "Patient Name",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "conditions",
    header: () => <div className="">Conditions</div>,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          {row.original.conditions.map((data) => (
            <span>{data}</span>
          ))}
        </div>
      );
    },
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
    cell: ({ row }) => {
      const patient = row.original;
      const [isRemoveDialog, setIsRemoveDialog] = useState(false);
      const [isEditDialog, setIsEditDialog] = useState(false);

      const removePatient = (id) => {
        console.log("patientID", id);
        setIsRemoveDialog(true);
        // isRemoveDialog = true;
        patientID = id;
        console.log("isRemoveDialog", isRemoveDialog);
      };

      const editPatient = (data) => {
        console.log("patient", data);
        setIsEditDialog(true);
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(patient.patientID)}
              >
                <Copy className="mr-2 w-5" />
                Copy
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editPatient(patient)}>
                <SquarePen className="mr-2 w-5" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => removePatient(patient.patientID)}
              >
                <Trash2 className="mr-2 w-5" />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Edit Dialog */}
          <Dialog open={isEditDialog}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Remove Patient</DialogTitle>
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
          {/* Remove Dialog */}
          <Dialog open={isRemoveDialog}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Remove Patient</DialogTitle>
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
