import { db } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
    slug: string;
};

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<RouteParams> }
) {
    try {
        const { slug } = await params;
        if (!slug) {
            return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
        }

        const project = await db.project.findUnique({
            where: { slug },
        });

        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        const body = await req.json();
        const { collectionId, method, userId } = body;

        if (!collectionId || !method) {
            return NextResponse.json({ error: 'collectionId and method are required' }, { status: 400 });
        }

        if (!userId) {
            return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
        }

        // Validate collection belongs to this project
        const collection = await db.collection.findFirst({
            where: { id: collectionId, projectId: project.id },
        });

        if (!collection) {
            return NextResponse.json({ error: 'Collection not found or does not belong to project' }, { status: 404 });
        }

        // Check for existing endpoint with same method
        const existingEndpoint = await db.endpoint.findFirst({
            where: { collectionId, method },
        });

        if (existingEndpoint) {
            return NextResponse.json({ error: `Endpoint with method ${method} already exists` }, { status: 409 });
        }

        // Create endpoint with default values
        const endpoint = await db.endpoint.create({
            data: {
                collectionId,
                method,
                userId,
                projectId: project.id,
                statusCode: 200,
                delay: 0,
                response: collection.baseData || [], // fallback to empty array
            },
        });

        return NextResponse.json(endpoint, { status: 201 });
        } catch (error) {
        if (error && typeof error === "object" && "isAxiosError" in error && (error as import("axios").AxiosError).isAxiosError) {
            const axiosError = error as import("axios").AxiosError;
            return NextResponse.json({ error: axiosError.message }, { status: axiosError.response?.status || 500 });
        }
        console.error("CreateEndpoint error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
