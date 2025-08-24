import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest,
    { params }: { params: { slug: string } }) {
    try {
        const { slug } = params;
        console.log(slug);

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
        const { name, path, baseData, desc } = body;

        const collection = await db.collection.create({
            data: {
                name,
                path,
                desc,
                baseData,
                projectId: project.id,
            },
        });

        return NextResponse.json(collection);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
