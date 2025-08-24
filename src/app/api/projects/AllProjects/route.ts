import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId, limit } = body;

        if (!userId) {
            return new Response("Missing userId", { status: 400 });
        }

        const projects = await db.project.findMany({
            where: { userId },
            take: limit ? parseInt(limit) : undefined,
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { collections: true },
                },
            },
        });


        return NextResponse.json(projects);
    }
    catch (error) {
        console.error("Error fetching projects:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}