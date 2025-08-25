"use client";

import { useState, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import axios, { AxiosError } from "axios";
import Link from "next/link";


export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [slug, setSlug] = useState("");
  const [userId, setUserId] = useState("");
  
  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) setUserId(storedId);
  }, []);

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
      setName("");
      setDesc("");
      setSlug("");

      router.refresh();
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
    <div className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div
          className="text-2xl font-bold cursor-pointer bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent hover:opacity-90 transition"
          onClick={() => router.push("/dashboard")}
        >
          CloudMocker
        </div>

        <div className="flex items-center gap-6">
          <Link href="#" className="text-slate-400 hover:text-white transition">
            Projects
          </Link>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Add Project
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
                        <TooltipTrigger>
                          <Input
                            disabled
                            value={`${process.env.NEXT_PUBLIC_API_URL}/${userId}`}
                            className="bg-slate-800 border-slate-700 text-white"
                          />
                        </TooltipTrigger>
                        <TooltipContent side={"bottom"}>
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
                    <Button
                      variant="outline"
                      className="border-slate-600 text-black"
                    >
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
        </div>
      </div>
    </div>
  );
}
