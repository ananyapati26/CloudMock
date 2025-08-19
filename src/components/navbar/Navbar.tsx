"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

function AppNavbar() {
  return (
    <div className="w-full flex border-b justify-between sticky top-0 z-50">
      <div className="text-xl font-bold tracking-tight px-4 sm:px-8 py-4">
        MyDashboard
      </div>
      <div className=" flex items-center px-4 sm:px-8 py-4 gap-4">
        <a href="#" className="hover:text-primary">
          Projects
        </a>
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button variant={"secondary"}>Add Project</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Project Name</Label>
                  <Input id="name-1" name="name" placeholder="Project Name" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Description"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Base URL Path</Label>
                  <div className="flex gap-2">
                    <Input
                      id="url"
                      name="url"
                      disabled
                      defaultValue="My path"
                    />
                    <Input id="url" name="url" placeholder="name" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>
    </div>
  );
}

export default AppNavbar;
