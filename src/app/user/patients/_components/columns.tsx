"use client";
import React, { useState } from "react";
import {
  ArrowUpDown,
  MoreHorizontal,
  Copy,
  SquarePen,
  Trash2,
} from "lucide-react";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Patient } from "../../../../../types";
import { Button, Dropdown, Menu, Modal, message } from "antd";
import type { MenuProps } from "antd";
import { PatientEditModal } from "./patient-edit-modal";
import { deletePatient } from "@/services";

const columns = (
  handleRemove: (patientId: string) => Promise<void>
): ColumnDef<Patient>[] => [
  {
    accessorKey: "id",
    header: "Patient ID",
  },
  {
    accessorKey: "firstName",
    header: "Patient Name",
    cell: ({ row }: { row: Row<Patient> }) => {
      const fullName = `${row.original.firstName} ${row.original.lastName}`;
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
  {
    accessorKey: "conditions",
    header: "Conditions",
  },
  {
    accessorKey: "nextAppointment",
    header: ({ column }) => {
      return (
        <Button
          type="text"
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
      const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);
      const [isEditModalVisible, setIsEditModalVisible] = useState(false);
      const [isDeleting, setIsDeleting] = useState(false);

      const showRemoveModal = () => {
        setIsRemoveModalVisible(true);
      };

      const onRemove = async () => {
        setIsDeleting(true);
        try {
          await handleRemove(patient.id);
          setIsRemoveModalVisible(false);
        } finally {
          setIsDeleting(false);
        }
      };

      const showEditModal = () => {
        setIsEditModalVisible(true);
      };

      const items: MenuProps["items"] = [
        {
          key: "1",
          label: "Copy ID",
          icon: <Copy className="w-4 h-4" />,
          onClick: () => navigator.clipboard.writeText(patient.id),
        },
        {
          key: "2",
          label: "Edit",
          icon: <SquarePen className="w-4 h-4" />,
          onClick: showEditModal,
        },
        {
          key: "3",
          label: "Delete",
          icon: <Trash2 className="w-4 h-4" />,
          onClick: showRemoveModal,
        },
      ];

      return (
        <>
          <Dropdown
            overlay={<Menu items={items} />}
            placement="bottomRight"
            arrow={{ pointAtCenter: true }}
            trigger={["click"]}
          >
            <Button type="text" icon={<MoreHorizontal className="h-4 w-4" />} />
          </Dropdown>

          <Modal
            title="Remove Patient"
            open={isRemoveModalVisible}
            onOk={onRemove}
            onCancel={() => setIsRemoveModalVisible(false)}
            confirmLoading={isDeleting}
          >
            <p>Are you sure you want to remove the patient ({patient.id})?</p>
          </Modal>

          <PatientEditModal
            open={isEditModalVisible}
            data={patient}
            setIsEditDialog={setIsEditModalVisible}
          />
        </>
      );
    },
  },
];

export { columns };
