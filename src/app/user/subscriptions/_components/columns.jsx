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
  EyeIcon
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
import { PatientEditModal } from "./patient-edit-modal";
import { useRouter } from "next/navigation";

let patientID = "";

export const columns = [
  {
    accessorKey: "subscriptionId",
    header: "Subscription ID",
  },
  {
    accessorKey: "name",
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
    accessorKey: "subscriptionType",
    header: "Subscription Type",
  },
  {
    accessorKey: "subscriptionStartDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-xs sm:text-sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Subscription Start Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="pl-4">{row.original.subscriptionStartDate}</div>;
    },
  },
  {
    accessorKey: "subscriptionEndDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-xs sm:text-sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Subscription End Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="pl-4">{row.original.subscriptionEndDate}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const patient = row.original;
      const [isRemoveDialog, setIsRemoveDialog] = useState(false);
      const [isEditDialog, setIsEditDialog] = useState(false);
      const [patientData, setPatientData] = useState([]);

      const removePatient = (id) => {
        setIsRemoveDialog(true);
        // isRemoveDialog = true;
        patientID = id;
        console.log("isRemoveDialog", isRemoveDialog);
      };

      const editPatient = (data) => {
        setIsEditDialog(true);
        setPatientData(data);
      };

      const handleRemoveSubscription = async (id) => {
        try {
          const response = await fetch(
            "https://retina-mobile-app-bankend.vercel.app/api/v1/doctor/subscriptions/" + id,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const { data } = await response.json();
          window.location.reload()
        } catch (error) {}
      };
      const router = useRouter();
      const views = (patient) => {
        router.push("/user/viewPatient/"+patient.pId);
      }
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
              <DropdownMenuItem onClick={() => views(patient)}>
                <EyeIcon className="mr-2 w-5" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editPatient(patient)}>
                <SquarePen className="mr-2 w-5" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => removePatient(patient.subscriptionId)}
              >
                <Trash2 className="mr-2 w-5" />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Edit Dialog */}
          <PatientEditModal
            open={isEditDialog}
            data={patientData}
            setIsEditDialog={setIsEditDialog}
          />
          {/* Remove Dialog */}
          <Dialog open={isRemoveDialog}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Remove Patients Subscription</DialogTitle>
                <DialogDescription>
                  Are you really want to remove the patient({patientID}) ?
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="sm:justify-start">
                <Button
                  type="button"
                  onClick={async () => {
                    await handleRemoveSubscription(patientID)
                    setIsRemoveDialog(false);
                  }}
                >
                  Yes
                </Button>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={async () => {
                      setIsRemoveDialog(false);
                    }}
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
