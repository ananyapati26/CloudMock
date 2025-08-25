"use client";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { useParams } from "next/navigation";

interface CreateCollectionDialogProps {
  onCollectionCreated: () => void;
}

export default function CreateCollectionDialog({ onCollectionCreated }: CreateCollectionDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [baseType, setBaseType] = useState("human");
  const [prompt, setPrompt] = useState("");
  const [generatedOutput, setGeneratedOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { slug } = useParams();
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : "null";

  const handleCreateCollection = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name");
      const path = formData.get("path");
      const description = formData.get("description");

      let baseDataParsed: Record<string, unknown> | null = null;
      if (generatedOutput) {
        try {
          const cleanedOutput = generatedOutput
            .replace(/\/\/.*$/gm, "")
            .replace(/,\s*]/g, "]")
            .replace(/,\s*}/g, "}");
          baseDataParsed = JSON.parse(cleanedOutput);
        } catch {
          baseDataParsed = null;
        }
      } else {
        try {
          baseDataParsed = JSON.parse(prompt);
        } catch {
          baseDataParsed = null;
        }
      }

      await axios.post(`/api/projects/${slug}/CreateCollection`, {
        name,
        path,
        userId,
        description,
        baseData: baseDataParsed,
      });

      setIsDialogOpen(false);
      onCollectionCreated();
    } catch (error) {
      console.error("Error creating collection:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGeneratedOutput("");

    try {
      console.log("going to generate")
      const response = await axios.post("/api/generateApi", { prompt });

      if (response.data?.output) {
        const rawText = response.data.output;
        const jsonMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        if (jsonMatch && jsonMatch[1]) {
          setGeneratedOutput(jsonMatch[1].trim());
        } else {
          setGeneratedOutput(rawText.trim());
        }
      }
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>Create Collection</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] rounded-lg max-h-[80vh] overflow-y-auto bg-gray-900 text-gray-200 border border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-gray-100">Create New Collection</DialogTitle>
          <DialogDescription className="text-gray-400">
            Configure your new Collection.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreateCollection}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="grid gap-2">
              <Label className="text-gray-300">Collection Name</Label>
              <Input name="name" placeholder="Collection Name" className="bg-gray-800 text-gray-200 border border-gray-700" />
            </div>
            <div className="grid gap-2">
              <Label className="text-gray-300">Path</Label>
              <Input name="path" placeholder="/users" className="bg-gray-800 text-gray-200 border border-gray-700" />
            </div>
            <div className="col-span-2 grid gap-2">
              <Label className="text-gray-300">Description</Label>
              <Input name="description" placeholder="Get list of users" className="bg-gray-800 text-gray-200 border border-gray-700" />
            </div>

            <div className="col-span-2 grid gap-3 mt-4">
              <Label className="text-gray-300">Base Data</Label>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={baseType === "human" ? "default" : "outline"}
                  className={baseType === "human" ? "bg-blue-600 text-white" : "border-gray-600 text-gray-300"}
                  onClick={() => setBaseType("human")}
                >
                  Humanized Prompt
                </Button>
                <Button
                  type="button"
                  variant={baseType === "schema" ? "default" : "outline"}
                  className={baseType === "schema" ? "bg-blue-600 text-white" : "border-gray-600 text-black"}
                  onClick={() => setBaseType("schema")}
                >
                  Schema
                </Button>
              </div>
              <Textarea
                placeholder={baseType === "human" ? "Describe your data..." : "Paste JSON schema here..."}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={baseType === "human" ? 4 : 6}
                className="bg-gray-800 text-gray-200 border border-gray-700"
              />
              <Button
                type="button"
                onClick={async () => {
                  await handleGenerate()
                }}
                disabled={isGenerating || !prompt.trim()}
                className="bg-blue-600 hover:bg-blue-500 text-white"
              >
                {isGenerating ? "Generating..." : "Generate"}
              </Button>
              {generatedOutput && (
                <div className="mt-4 p-3 border border-gray-700 rounded bg-gray-800 text-gray-200 text-sm">
                  <strong>Generated Output:</strong>
                  <pre className="whitespace-pre-wrap mt-2">{generatedOutput}</pre>
                </div>
              )}
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="border-gray-600 text-black"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-500 text-white"
            >
              {isSubmitting ? "Creating..." : "Create Collection"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
