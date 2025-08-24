"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Copy, Check } from "lucide-react";

interface Endpoint {
    id: string;
    method: string;
    statusCode: number;
    delay: number;
}

export default function CollectionCard({
    slug,
    id,
    name,
    description,
    baseUrl,
    sampleResponse,
}: {
    slug: string;
    id: string;
    name: string;
    description: string;
    baseUrl: string;
    sampleResponse: any;
}) {
    const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(baseUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };

    useEffect(() => {
        fetchEndpoints();
    }, []);

    const fetchEndpoints = async () => {
        try {
            const res = await axios.post(`/api/projects/${slug}/AllEndpoints`, {
                collectionId: id,
            });
            setEndpoints(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const createEndpoint = async () => {
        try {
            const res = await axios.post(`/api/projects/${slug}/CreateEndpoint`, {
                collectionId: id,
                method: "GET",
            });
            setEndpoints([...endpoints, res.data]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-700 text-gray-200">
            <div className="flex justify-between"><h2 className="text-3xl font-bold text-white mb-2">{name}</h2><Button
                onClick={createEndpoint}
                className=" bg-blue-600 hover:bg-blue-700 text-white"
            >
                <Plus className="h-4 w-4 mr-2" /> Create Endpoint
            </Button></div>

            <p className="text-gray-400 text-base mb-4">{description}</p>

            <div className="mb-6 flex items-center justify-between bg-gray-800 p-3 rounded-xl">
                <p className="text-sm font-mono text-blue-400 break-all">{baseUrl}</p>
                <button
                    onClick={handleCopy}
                    className="ml-3 text-gray-400 hover:text-blue-400 cursor-copy"
                    title="Copy to clipboard"
                >
                    {copied ? <Check className="h-5 w-5 text-green-400" /> : <Copy className="h-5 w-5" />}
                </button>
            </div>

            <div className="mb-6">
                <h3 className="font-semibold text-gray-200 mb-3">Endpoints</h3>
                {loading ? (
                    <p className="text-gray-400 text-sm">Loading...</p>
                ) : endpoints.length === 0 ? (
                    <p className="text-gray-400 text-sm">No endpoints yet</p>
                ) : (
                    endpoints.map((ep) => (
                        <div
                            key={ep.id}
                            className="flex justify-between items-center bg-gray-800 p-4 rounded-xl mb-3 text-sm"
                        >
                            <div className="flex items-center">
                                <span className="font-mono text-green-400 mr-4 min-w-[60px]">
                                    {ep.method}
                                </span>
                                <span className="text-gray-300">{ep.statusCode}</span>
                            </div>
                            <span className="text-gray-400 font-mono text-xs">{ep.delay}ms</span>
                        </div>
                    ))
                )}
            </div>

            <div className="mb-6">
                <h3 className="font-semibold text-gray-200 mb-3">Sample Response</h3>
                <pre className="bg-gray-800 p-4 rounded-xl text-xs overflow-x-auto text-gray-300">
                    <code>{JSON.stringify(sampleResponse, null, 2)}</code>
                </pre>
            </div>


        </div>
    );
}
