"use client";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Textarea } from "@/src/components/ui/textarea";
import { Loader2 } from "lucide-react";

type ApiResponse = {
    status: number;
    statusText: string;
    time: number;
    size: string;
    body: string;
    headers: Record<string, string>;
};

export default function ApiPlayground() {
    const [method, setMethod] = useState("GET");
    const [url, setUrl] = useState("");
    const [body, setBody] = useState("");
    const [response, setResponse] = useState<ApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSendRequest = async () => {
        if (!url.trim()) {
            setError("Please enter a valid URL.");
            return;
        }
        setIsLoading(true);
        setResponse(null);
        setError(null);
        const startTime = performance.now();

        try {
            const proxyResponse = await fetch("/api/proxy", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url, method, body }),
            });

            const data = await proxyResponse.json();
            const endTime = performance.now();

            if (!proxyResponse.ok) {
                throw new Error(data.details || "Request failed");
            }

            let formattedBody = data.body;
            try {
                formattedBody = JSON.stringify(JSON.parse(data.body), null, 2);
            } catch (e) { }

            setResponse({
                status: data.status,
                statusText: data.statusText,
                headers: data.headers,
                body: formattedBody,
                time: Math.round(endTime - startTime),
                size: `${(new Blob([data.body]).size / 1024).toFixed(2)} KB`,
            });

        } catch (err) {
            if (err && typeof err === "object" && "isAxiosError" in err) {
                setError((err as import("axios").AxiosError).message);
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    const getStatusColor = (status: number) => {
        if (status >= 200 && status < 300) return "text-green-400";
        if (status >= 400 && status < 500) return "text-yellow-400";
        if (status >= 500) return "text-red-400";
        return "text-slate-400";
    };

    return (
        <div className="flex h-full flex-col gap-6 p-6 font-mono text-sm bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
            <h1 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                API Playground 🚀
            </h1>
            <p className="text-center text-slate-400 mb-4">
                Test your APIs in style. Enter your endpoint and fire away!
            </p>

            <div className="flex items-center gap-3 bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-800 shadow-lg">
                <Select value={method} onValueChange={setMethod}>
                    <SelectTrigger className="w-[120px] shrink-0 rounded-md border-slate-700 bg-slate-800 font-semibold hover:border-blue-500 focus:ring-blue-500 transition">
                        <SelectValue placeholder="Method" />
                    </SelectTrigger>
                    <SelectContent className="rounded-md border-slate-700 bg-slate-800 text-white shadow-md">
                        <SelectItem value="GET" className="focus:bg-blue-600">GET</SelectItem>
                        <SelectItem value="POST" className="focus:bg-blue-600">POST</SelectItem>
                        <SelectItem value="PUT" className="focus:bg-blue-600">PUT</SelectItem>
                        <SelectItem value="DELETE" className="focus:bg-blue-600">DELETE</SelectItem>
                    </SelectContent>
                </Select>

                <Input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter your API endpoint (e.g., https://api.example.com/data)"
                    className="h-11 flex-grow rounded-md border-slate-700 bg-slate-800 text-slate-300 placeholder:text-slate-500 focus:border-blue-500 focus:ring focus:ring-blue-500/30 transition"
                />

                <Button
                    onClick={handleSendRequest}
                    disabled={isLoading}
                    className="h-11 w-[110px] rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-6 font-semibold text-white transition-all hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 shadow-lg"
                >
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Send"}
                </Button>
            </div>

            {/* Request & Response Panes */}
            <div className="grid h-full min-h-[520px] grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Request Pane */}
                <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/70 backdrop-blur-md shadow-lg">
                    <Tabs defaultValue="body" className="flex h-full flex-col">
                        <TabsList className="w-full justify-start rounded-none border-b border-slate-800 bg-slate-900/50 p-0">
                            <TabsTrigger value="params" className="px-4 py-2.5 text-slate-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:bg-slate-800 data-[state=active]:text-white transition">Params</TabsTrigger>
                            <TabsTrigger value="headers" className="px-4 py-2.5 text-slate-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:bg-slate-800 data-[state=active]:text-white transition">Headers</TabsTrigger>
                            <TabsTrigger value="body" className="px-4 py-2.5 text-slate-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:bg-slate-800 data-[state=active]:text-white transition">Body</TabsTrigger>
                        </TabsList>
                        <TabsContent value="body" className="flex-grow p-0">
                            <Textarea
                                placeholder='Enter JSON body here (e.g., { "name": "John" })'
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                className="h-full resize-none rounded-none border-0 bg-transparent p-4 font-mono text-base text-slate-300 focus-visible:ring-0"
                            />
                        </TabsContent>
                        <TabsContent value="params" className="p-4 text-slate-500">Coming soon...</TabsContent>
                        <TabsContent value="headers" className="p-4 text-slate-500">Coming soon...</TabsContent>
                    </Tabs>
                </div>

                {/* Response Pane */}
                <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/70 backdrop-blur-md shadow-lg">
                    {response ? (
                        <>
                            <div className="flex flex-wrap gap-4 items-center border-b border-slate-800 p-4">
                                <h3 className="font-semibold text-lg">Response</h3>
                                <span className={`${getStatusColor(response.status)} font-bold`}>
                                    {response.status} {response.statusText}
                                </span>
                                <span className="text-slate-400">⏱ {response.time}ms</span>
                                <span className="text-slate-400">📦 {response.size}</span>
                            </div>
                            <div className="flex-grow p-4">
                                <pre className="h-full w-full overflow-auto text-sm text-slate-300 rounded-md bg-slate-950/40 p-4 shadow-inner">
                                    <code>{response.body}</code>
                                </pre>
                            </div>
                        </>
                    ) : (
                        <div className="flex h-full items-center justify-center text-slate-500">
                            {isLoading ? (
                                <div className="flex items-center gap-3 animate-pulse">
                                    <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
                                    <span className="text-blue-400">Fetching response...</span>
                                </div>
                            ) : error ? (
                                <div className="p-4 text-red-400">❌ {error}</div>
                            ) : (
                                "Send a request to see the response here"
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
