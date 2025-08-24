"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import CreateCollectionDialog from "@/components/project/CreateCollectionDialog";
import CollectionList from "@/components/project/CollectionList";
import { useParams } from "next/navigation";

export default function ProjectPage() {
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const slug = params?.slug as string;

  const fetchCollections = async () => {
    try {
      const res = await axios.get(`/api/projects/${slug}/AllCollections`);
      setCollections(res.data);
    } catch (error) {
      console.error("Error fetching collections:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  if (loading) return <div className="p-6 text-center text-gray-600 dark:text-gray-300">Loading...</div>;

  return (
    <div className="p-6">
      {collections.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Create a Collection</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Start by creating your first collection.</p>
          <div className="mt-6">
            <CreateCollectionDialog onCollectionCreated={fetchCollections} />
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Collections</h2>
            <CreateCollectionDialog onCollectionCreated={fetchCollections} />
          </div>
          <CollectionList collections={collections} slug={slug} />
        </div>
      )}
    </div>
  );
}
