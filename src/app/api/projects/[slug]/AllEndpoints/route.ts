import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest,
    { params }: { params: { slug: string } }) {
    try {
        const { slug } = params;

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