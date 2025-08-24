import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, desc, slug, userId } = body;

        if (!name || !desc || !slug || !userId) {
            return new Response("Missing required fields", { status: 400 });
        }

        const normalizedSlug = slug.replace(/^\/+/, '');
        const existingProject = await db.project.findUnique({
            where: { slug: normalizedSlug },
        });

        if (existingProject) {
            return new Response("Slug must be unique", { status: 409 });
        }

        
        const newProject = await db.project.create({
            data: {
                name,
                desc,
                slug: normalizedSlug,
                userId,
            },
        });

        return NextResponse.json(newProject);
    }
    catch (error) {
        console.error("Error creating project:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}