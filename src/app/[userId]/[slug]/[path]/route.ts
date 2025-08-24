import { db } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Endpoint {
    id: string;
    method: string;
    response: unknown;
}

interface Collection {
    id: string;
    projectId: string;
    path: string;
    endpoints: Endpoint[];
}

type RouteParams = {
    userId: string;
    slug: string;
    path: string;
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<RouteParams> }
) {
    try {
        const { userId, slug, path } = await params;

        const project = await db.project.findFirst({
            where: { 
                slug, 
                userId 
            },
        });

        if (!project) {
            return NextResponse.json(
                { error: "Project not found" }, 
                { status: 404 }
            );
        }

        const collection = await db.collection.findFirst({
            where: { 
                projectId: project.id, 
                path: `/${path}` 
            },
            include: { 
                endpoints: true 
            },
        });

        if (!collection) {
            return NextResponse.json(
                { error: "Collection not found" }, 
                { status: 404 }
            );
        }

        const endpoint = collection.endpoints.find(
            (e: Endpoint) => e.method === "GET"
        );

        if (!endpoint) {
            return NextResponse.json(
                { error: "GET endpoint not defined" }, 
                { status: 404 }
            );
        }

        return NextResponse.json(endpoint.response || []);

    } catch (err) {
        console.error("Route handler error:", err);
        return NextResponse.json(
            { error: "Internal server error" }, 
            { status: 500 }
        );
    }
}