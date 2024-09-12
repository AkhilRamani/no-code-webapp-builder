import { NextResponse } from "next/server";
import { createTableController } from "@/lib/server/controllers/table/createTable.controller";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
    try {
        const { projectId, name, fields, trackingId } = await request.json();

        if (!ObjectId.isValid(projectId)) {
            return NextResponse.json({ error: `Invalid projectId` }, { status: 400 });
        }

        const res = await createTableController({ projectId, name, fields })

        return NextResponse.json({ ...res, trackingId }, { status: 201 });
    } catch (error) {
        console.error("Error creating table:", error);
        return NextResponse.json({ error: "Error creating table" }, { status: 500 });
    }
}