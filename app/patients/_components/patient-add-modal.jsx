"use client";
import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function PatientAddModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button onClick={() => setIsModalOpen(true)}>
            <div className="flex">
              <Plus className="mr-1" />
              <span className="hidden sm:block">Add New Patient</span>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Patient</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex !justify-between">
            <DialogClose className="w-full">
              <Button className="w-full bg-slate-300 text-black hover:text-white">
                Close
              </Button>
            </DialogClose>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
