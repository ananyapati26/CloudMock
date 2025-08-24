import { db } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const { slug } = params;

        if (!slug) {
            return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
        }
        const project = await db.project.findUnique({
            where: { slug },
        });

        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        const collections = await db.collection.findMany({
            where: { projectId: project.id },
        });

        if (!collections) {
            return NextResponse.json({ error: 'Collections not found' }, { status: 404 });
        }

        return NextResponse.json(collections);
    }
    catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}   
