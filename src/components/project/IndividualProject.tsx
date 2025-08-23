"use client";
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
export default function IndividualProjectPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCollectionCreated, setIsCollectionCreated] = useState(false);
  const handleCreateCollection = (e: any) => {
    e.preventDefault();

    setIsDialogOpen(false);
    setIsCollectionCreated(true);
  };
  const renderMainView = () => {
    if (isCollectionCreated) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <h2 className="text-xl font-semibold text-gray-700">
            Collection created successfully!
          </h2>
          <p className="text-gray-500 mt-2">
            Your Collection is now live and ready to use.
          </p>

          <DialogTrigger asChild>
            <Button className="mt-6 font-semibold">Create Collection</Button>
          </DialogTrigger>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <h2 className="text-xl font-semibold text-gray-700">
            Create a Collection
          </h2>
          <DialogTrigger asChild>
            <Button className="mt-6 font-semibold">Create Collection</Button>
          </DialogTrigger>
        </div>
      );
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen font-sans antialiased text-gray-800">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {renderMainView()}
        <DialogContent className="sm:max-w-[700px] rounded-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Collection</DialogTitle>
            <DialogDescription>
              Configure the behavior and response of your new Collection.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateCollection}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="collection-name">Collection Name</Label>
                <Input
                  id="name"
                  placeholder="Collection Name"
                  className="rounded-md"
                />
              </div>
              <div className="grid gap-2 ">
                <Label htmlFor="path" className="sm:mt-5">
                  Path
                </Label>
                <Input id="path" placeholder="/users" className="rounded-md" />
                <p className="text-xs text-gray-500">
                  Must start with / (e.g., /users, /orders/[:id])
                </p>
              </div>
              <div className="col-span-1 md:col-span-2 grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Get list of users"
                  className="rounded-md"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status-code">Status Code</Label>
                <Input
                  id="status-code"
                  type="number"
                  defaultValue={200}
                  className="rounded-md"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="response-delay">Response Delay (ms)</Label>
                <Input
                  id="response-delay"
                  type="number"
                  defaultValue={0}
                  className="rounded-md"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <Separator />
              </div>
              <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <Label htmlFor="dynamic-data" className="text-sm">
                      Use Faker.js for Dynamic Data
                    </Label>
                    <p className="text-xs text-gray-500">
                      Generate realistic fake data on each request
                    </p>
                  </div>
                  <Switch id="dynamic-data" />
                </div>
              </div>
            </div>
            <DialogFooter className="mt-6 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create Collection</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
