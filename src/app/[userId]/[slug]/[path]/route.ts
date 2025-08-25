import { db } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

type RouteParams = {
  userId: string;
  slug: string;
  path: string;
};

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
    return NextResponse.json(endpoint!.response || []);
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ✅ POST (Add)
export async function POST(req: NextRequest, { params }: { params: Promise<RouteParams> }) {
  try {
    const { userId, slug, path } = await params;
    const body = await req.json();
    const { error, status, endpoint, collection } = await findEndpoint(userId, slug, path, "POST");
    if (error) return NextResponse.json({ error }, { status });

    let data = Array.isArray(endpoint!.response) ? endpoint!.response : [];
    const newItem = { id: randomUUID(), ...body };
    data.push(newItem);

    await db.endpoint.update({ where: { id: endpoint!.id }, data: { response: data } });
    await db.collection.update({ where: { id: collection!.id }, data: { baseData: data } });

    return NextResponse.json(newItem, { status: 201 });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ✅ PUT (Replace)
export async function PUT(req: NextRequest, { params }: { params: Promise<RouteParams> }) {
  try {
    const { userId, slug, path } = await params;
    const body = await req.json();
    const { id, ...rest } = body;
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const { error, status, endpoint, collection } = await findEndpoint(userId, slug, path, "PUT");
    if (error) return NextResponse.json({ error }, { status });

    let data = Array.isArray(endpoint!.response) ? endpoint!.response : [];
    const index = data.findIndex((item: any) => item.id === id);
    if (index === -1) return NextResponse.json({ error: "Item not found" }, { status: 404 });

    data[index] = { id, ...rest };

    await db.endpoint.update({ where: { id: endpoint!.id }, data: { response: data } });
    await db.collection.update({ where: { id: collection!.id }, data: { baseData: data } });

    return NextResponse.json(data[index]);
  } catch (err) {
    console.error("PUT error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ✅ PATCH (Update specific fields)
export async function PATCH(req: NextRequest, { params }: { params: Promise<RouteParams> }) {
  try {
    const { userId, slug, path } = await params;
    const body = await req.json();
    const { id, ...rest } = body;
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const { error, status, endpoint, collection } = await findEndpoint(userId, slug, path, "PATCH");
    if (error) return NextResponse.json({ error }, { status });

    let data = Array.isArray(endpoint!.response) ? endpoint!.response : [];
    const index = data.findIndex((item: any) => item.id === id);
    if (index === -1) return NextResponse.json({ error: "Item not found" }, { status: 404 });

    if (typeof data[index] === "object" && data[index] !== null && typeof rest === "object" && rest !== null) {
      data[index] = { ...data[index], ...rest };
    } else {
      return NextResponse.json({ error: "Invalid data for update" }, { status: 400 });
    }

    await db.endpoint.update({ where: { id: endpoint!.id }, data: { response: data } });
    await db.collection.update({ where: { id: collection!.id }, data: { baseData: data } });

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
    const body = await req.json();
    const { id } = body;
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const { error, status, endpoint, collection } = await findEndpoint(userId, slug, path, "DELETE");
    if (error) return NextResponse.json({ error }, { status });

    let data = Array.isArray(endpoint!.response) ? endpoint!.response : [];
    const filtered = data.filter((item: any) => item.id !== id);
    if (filtered.length === data.length)
      return NextResponse.json({ error: "Item not found" }, { status: 404 });

    await db.endpoint.update({ where: { id: endpoint!.id }, data: { response: filtered } });
    await db.collection.update({ where: { id: collection!.id }, data: { baseData: filtered } });

    return NextResponse.json({ message: "Deleted successfully", data: filtered });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
