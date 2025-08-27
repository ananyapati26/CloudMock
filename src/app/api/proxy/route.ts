import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url, method, body } = await req.json();

    const requestOptions: RequestInit = {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: (method === "POST" || method === "PUT" || method === "PATCH" || method === "DELETE") ? body : undefined,
    };

    const apiResponse = await fetch(url, requestOptions);
    const responseBody = await apiResponse.text();
    const responseHeaders = Object.fromEntries(apiResponse.headers.entries());

    return NextResponse.json({
      status: apiResponse.status,
      statusText: apiResponse.statusText,
      headers: responseHeaders,
      body: responseBody,
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch API", details: error },
      { status: 500 }
    );
  }
}