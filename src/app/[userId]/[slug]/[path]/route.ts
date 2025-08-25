import { db } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { Prisma } from "@prisma/client";

type RouteParams = {
  userId: string;
  slug: string;
  path: string;
};

// Each item in endpoint response
type ResponseItem = Record<string, unknown> & { id: string };

async function findEndpoint(userId: string, slug: string, path: string, method: string) {
  const project = await db.project.findFirst({ where: { slug, userId } });
  if (!project) return { error: "Project not found", status: 404 };

  const collection = await db.collection.findFirst({
    where: { projectId: project.id, path: `/${path}` },
    include: { endpoints: true },
  });
  if (!collection) return { error: "Collection not found", status: 404 };

  const endpoint = collection.endpoints.find((e) => e.method === method);
  if (!endpoint) return { error: `${method} endpoint not defined`, status: 404 };

  return { endpoint, collection };
}

// ✅ GET
export async function GET(req: NextRequest, { params }: { params: Promise<RouteParams> }) {
  try {
    const { userId, slug, path } = await params;
    const { error, status, endpoint } = await findEndpoint(userId, slug, path, "GET");
    if (error) return NextResponse.json({ error }, { status });

    return NextResponse.json((endpoint!.response as ResponseItem[]) || []);
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ✅ POST
export async function POST(req: NextRequest, { params }: { params: Promise<RouteParams> }) {
  try {
    const { userId, slug, path } = await params;
    const body: Omit<ResponseItem, "id"> = await req.json();
    const { error, status, endpoint, collection } = await findEndpoint(userId, slug, path, "POST");
    if (error) return NextResponse.json({ error }, { status });

    const data: ResponseItem[] = Array.isArray(endpoint!.response) ? (endpoint!.response as ResponseItem[]) : [];
    const newItem: ResponseItem = { id: randomUUID(), ...body };
    data.push(newItem);

    await db.endpoint.update({ where: { id: endpoint!.id }, data: { response: data as Prisma.JsonValue } });
    await db.collection.update({ where: { id: collection!.id }, data: { baseData: data as Prisma.JsonValue } });

    return NextResponse.json(newItem, { status: 201 });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ✅ PUT
export async function PUT(req: NextRequest, { params }: { params: Promise<RouteParams> }) {
  try {
    const { userId, slug, path } = await params;
    const body: ResponseItem = await req.json();
    if (!body.id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const { error, status, endpoint, collection } = await findEndpoint(userId, slug, path, "PUT");
    if (error) return NextResponse.json({ error }, { status });

    const data: ResponseItem[] = Array.isArray(endpoint!.response) ? (endpoint!.response as ResponseItem[]) : [];
    const index = data.findIndex((item) => item.id === body.id);
    if (index === -1) return NextResponse.json({ error: "Item not found" }, { status: 404 });

    data[index] = body;

    await db.endpoint.update({ where: { id: endpoint!.id }, data: { response: data as Prisma.JsonValue } });
    await db.collection.update({ where: { id: collection!.id }, data: { baseData: data as Prisma.JsonValue } });

    return NextResponse.json(data[index]);
  } catch (err) {
    console.error("PUT error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ✅ PATCH
export async function PATCH(req: NextRequest, { params }: { params: Promise<RouteParams> }) {
  try {
    const { userId, slug, path } = await params;
    const body: Partial<Omit<ResponseItem, "id">> & { id: string } = await req.json();
    if (!body.id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const { error, status, endpoint, collection } = await findEndpoint(userId, slug, path, "PATCH");
    if (error) return NextResponse.json({ error }, { status });

    const data: ResponseItem[] = Array.isArray(endpoint!.response) ? (endpoint!.response as ResponseItem[]) : [];
    const index = data.findIndex((item) => item.id === body.id);
    if (index === -1) return NextResponse.json({ error: "Item not found" }, { status: 404 });

    data[index] = { ...data[index], ...body };

    await db.endpoint.update({ where: { id: endpoint!.id }, data: { response: data as Prisma.JsonValue } });
    await db.collection.update({ where: { id: collection!.id }, data: { baseData: data as Prisma.JsonValue } });

    return NextResponse.json(data[index]);
  } catch (err) {
    console.error("PATCH error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ✅ DELETE
export async function DELETE(req: NextRequest, { params }: { params: Promise<RouteParams> }) {
  try {
    const { userId, slug, path } = await params;
    const body: { id: string } = await req.json();
    if (!body.id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const { error, status, endpoint, collection } = await findEndpoint(userId, slug, path, "DELETE");
    if (error) return NextResponse.json({ error }, { status });

    const data: ResponseItem[] = Array.isArray(endpoint!.response) ? (endpoint!.response as ResponseItem[]) : [];
    const filtered = data.filter((item) => item.id !== body.id);
    if (filtered.length === data.length) return NextResponse.json({ error: "Item not found" }, { status: 404 });

    await db.endpoint.update({ where: { id: endpoint!.id }, data: { response: filtered as Prisma.JsonValue } });
    await db.collection.update({ where: { id: collection!.id }, data: { baseData: filtered as Prisma.JsonValue } });

    return NextResponse.json({ message: "Deleted successfully", data: filtered });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
