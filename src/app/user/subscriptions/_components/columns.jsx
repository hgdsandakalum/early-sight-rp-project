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
  EyeIcon,
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
            "https://retina-mobile-app-bankend.vercel.app/api/v1/doctor/subscriptions/" +
              id,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const { data } = await response.json();
          window.location.reload();
        } catch (error) {}
      };
      const router = useRouter();
      const views = (patient) => {
        router.push("/user/viewPatient/" + patient.pId);
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
            <DropdownMenuContent
              align="end"
              style={{
                zIndex: 99999,
                backgroundColor: "white",
                width: 100,
              }}
            >
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => views(patient)}
                style={{
                  cursor: "pointer",
                }}
              >
                <EyeIcon className="mr-2 w-5" />
                View
              </DropdownMenuItem>

              <PatientEditModal
                open={isEditDialog}
                data={patientData}
                setIsEditDialog={setIsEditDialog}
                patient={patient}
                editPatient={editPatient}
              />
              {/* <DropdownMenuItem
                onClick={() => editPatient(patient)}
                style={{
                  cursor: "pointer",
                }}
              >
                <SquarePen className="mr-2 w-5 cursor-pointer" />
                Edit
              </DropdownMenuItem> */}
              <DropdownMenuItem
                onClick={() => removePatient(patient.subscriptionId)}
                style={{
                  cursor: "pointer",
                }}
              >
                <Trash2 className="mr-2 w-5 cursor-pointer" />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={isRemoveDialog}>
            <DialogContent
              className="sm:max-w-md"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 9999,
              }}
            >
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
                    await handleRemoveSubscription(patientID);
                    setIsRemoveDialog(false);
                  }}
                  style={{
                    color: "white",
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
