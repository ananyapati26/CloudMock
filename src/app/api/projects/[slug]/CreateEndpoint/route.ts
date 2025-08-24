import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, context: { params: { slug: string } }) {
    try {
        const { slug } = await context.params; // <-- await here

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
