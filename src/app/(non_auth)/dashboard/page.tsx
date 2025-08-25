"use client";
import ProjectsCards from "@/src/components/dashboard/Projects";
import QuickActions from "@/src/components/dashboard/QuickActions";
import RecentActivity from "@/src/components/dashboard/RecentActivity";
import StatsCards from "@/src/components/dashboard/TotalStats";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";

export default function Dashboard() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [slug, setSlug] = useState("");
  const [userId, setUserId] = useState("");

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
  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) setUserId(storedId);
  }, [handleSubmit]);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans px-6 py-8">
      <div className="mx-auto flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-slate-400">
              Manage your API mocks and collections
            </p>
          </div>
          {/* <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <span className="text-lg">+</span>
            New Project
          </button> */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <span className="text-lg">+</span>
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 text-white border border-slate-700 rounded-xl">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold ">
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

        <StatsCards />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Recent Projects</h2>
              <button className="text-blue-400 hover:text-blue-300 transition-colors">
                View All
              </button>
            </div>
            <ProjectsCards />
          </div>

          <div className="flex flex-col gap-8">
            <QuickActions />
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}
