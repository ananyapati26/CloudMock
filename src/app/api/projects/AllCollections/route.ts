import { db } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId, limit } = body;

        if (!userId) {
            return new Response("Missing userId", { status: 400 });
        }

        const collections = await db.collection.findMany({
            where: { userId },
            take: limit ? parseInt(limit) : undefined,
        });


        return NextResponse.json(collections);
    }
    catch (error) {
        console.error("Error fetching collections:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}