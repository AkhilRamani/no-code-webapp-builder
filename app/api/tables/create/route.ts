import { NextResponse } from "next/server";
import { createTableController } from "@/lib/server/controllers/table/createTable.apiController";

export async function POST(request: Request) {
    try {
        const { projectId, name, fields } = await request.json();

        const res = await createTableController({ projectId, name, fields })

        return NextResponse.json(res, { status: 201 });
    } catch (error) {
        console.error("Error creating table:", error);
        return NextResponse.json({ error: "Error creating table" }, { status: 500 });
    }
}