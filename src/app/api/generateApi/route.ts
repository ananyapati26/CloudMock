import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
        return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
    }

    try {
        console.log("going to find api key")
        const apiKey = process.env.GEMINI_API_KEY;
        console.log(apiKey)
        if (!apiKey) {
            return NextResponse.json({ error: 'Missing GEMINI_API_KEY environment variable' }, { status: 500 });
        }
        const genAI = new GoogleGenerativeAI(apiKey)
        console.log("generating")
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
        console.log("called")

        
        const result = await model.generateContent(prompt)
        console.log(result)
        const response = await result.response;
        const output = await response.text();
        console.log(output)

        return NextResponse.json({ output });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
