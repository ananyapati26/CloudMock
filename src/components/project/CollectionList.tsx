import CollectionCard from "./CollectionCard";

interface Collection {
  id: string;
  name: string;
  description: string;
  path: string;
  baseData: Record<string, unknown>;

}

export default function CollectionList({
  collections,
  slug,
}: {
  collections: Collection[];
  slug: string;
}) {
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  return (
    <div className="space-y-6 bg-gray-900 text-gray-200 p-4 rounded-lg">
      {collections.map((c) => (
        <CollectionCard
          key={c.id}
          slug={slug}
          id={c.id}
          name={c.name}
          description={c.description}
          baseUrl={`${process.env.NEXT_PUBLIC_API_URL}/${userId}/${slug}${c.path}`}
          sampleResponse={c.baseData || {}}
        />
      ))}
    </div>
  );
}
