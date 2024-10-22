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
import { useRouter } from "next/navigation";
import AppointmentEditModal from "./AppointmentEditModal";
import AppointmentViewModal from "./AppointmentViewModal"

let patientID = "";

export const columns = [
  {
    accessorKey: "appointmnetId",
    header: "Appointmnet ID",
  },
  {
    accessorKey: "name",
    header: "Patient Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const patient = row.original;
      const [isRemoveDialog, setIsRemoveDialog] = useState(false);
      const [isEditDialog, setIsEditDialog] = useState(false);
      const [patientData, setPatientData] = useState([]);

      const [isViewingDialogOpen, setIsViewvingDialogOpen] = useState(false);
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
        setIsViewvingDialogOpen(true);
        setPatientData(patient);
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
          <AppointmentEditModal
            open={isEditDialog}
            data={patientData}
            setIsEditDialog={setIsEditDialog}
          />
          <AppointmentViewModal
            open={isViewingDialogOpen}
            data={patientData}
            setIsEditDialog={setIsViewvingDialogOpen}
          />
          {/* <PatientEditModal
            open={isEditDialog}
            data={patientData}
            setIsEditDialog={setIsEditDialog}
          /> */}
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
                    await handleRemoveSubscription(patientID);
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
