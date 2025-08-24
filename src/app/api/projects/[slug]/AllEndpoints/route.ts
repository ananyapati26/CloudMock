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

        const body = await req.json();
        const { collectionId } = body;

        if (!collectionId) {
            return NextResponse.json({ error: 'Missing collectionId' }, { status: 400 });
        }

        const endpoints = await db.endpoint.findMany({
            where: { collectionId },
        });

        return NextResponse.json(endpoints);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}