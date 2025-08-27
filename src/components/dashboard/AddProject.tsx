"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Label } from "@/src/components/ui/label";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/src/components/ui/tooltip";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import axios, { AxiosError } from "axios";

interface AddProjectProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  userId: string;
}

export default function AddProject({ open, setOpen, userId }: AddProjectProps) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [slug, setSlug] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !desc || !slug) {
      alert("Please fill all fields");
      return;
    }
    try {
      await axios.post("/api/projects/CreateProject", {
        name,
        desc,
        slug,
        userId,
      });
      setOpen(false);
      window.location.reload();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      if (err.response?.status === 409) {
        alert("Slug must be unique");
      } else {
        alert(err.response?.data?.message || "Failed to create project");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <span className="text-lg">+</span>
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 text-white border border-slate-700 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Add Project
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mt-4">
            <div className="grid gap-2">
              <Label htmlFor="name-1" className="text-slate-300">
                Project Name
              </Label>
              <Input
                id="name-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Project Name"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-slate-300">
                Description
              </Label>
              <Textarea
                id="description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Description"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slug" className="text-slate-300">
                Base URL Path
              </Label>
              <div className="flex gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Input
                      disabled
                      value={`${process.env.NEXT_PUBLIC_API_URL}/${userId}`}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{`${process.env.NEXT_PUBLIC_API_URL}/${userId}`}</p>
                  </TooltipContent>
                </Tooltip>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="slug"
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline" className="border-slate-600 text-white">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
