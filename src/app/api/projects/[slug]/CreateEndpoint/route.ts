import { db } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
    slug: string;
}

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<RouteParams> }
) {
    try {
        // Await the params promise in Next.js 15
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
        const { collectionId, method } = body;

        const collection = await db.collection.findUnique({
            where: { id: collectionId },
        });

        if (!collection) {
            return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
        }

        const endpoint = await db.endpoint.create({
            data: {
                collectionId,
                method,
                response: collection.baseData,
            },
        });

        return NextResponse.json(endpoint);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
