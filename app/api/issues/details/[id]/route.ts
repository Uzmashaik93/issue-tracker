import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    if (!id) {
        return NextResponse.json({ error: "Issue ID is required" }, { status: 400 });
    }
    const response = await prisma.issue.findUnique({
        where: {
            id: Number(id)
        }
    });
    if (!response) {
        return NextResponse.json({ message: "Issue not found" }, { status: 404 });
    }
    return NextResponse.json(response, { status: 200 });
}