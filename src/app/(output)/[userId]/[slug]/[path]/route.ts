import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export const GET = async (req: NextRequest, { params }: { params: { userId: string; slug: string; path: string } }) => {
    const { userId, slug, path } = params;

    try {
        // Find project of that user
        const project = await db.project.findFirst({ where: { slug, userId } });
        if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

        // Find collection (endpoint)
        const collection = await db.collection.findFirst({
            where: { projectId: project.id, path: `/${params.path}` },
            include: { endpoints: true },
        });
        if (!collection) return NextResponse.json({ error: "Endpoint not found" }, { status: 404 });

        // Find GET endpoint
        const endpoint = collection.endpoints.find((e) => e.method === "GET");
        if (!endpoint) return NextResponse.json({ error: "GET not defined" }, { status: 404 });

        // Simulate delay if any
        // if (endpoint.delay) await new Promise((res) => setTimeout(res, endpoint.delay));

        // Return dummy response JSON
        return NextResponse.json(endpoint.response || []);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
};
