import { getTableDataController } from "@/lib/server/controllers/table/data/getTableData.controller";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { tableId: string, projectId: string } }) => {
    try {
        const { tableId, projectId } = params;

        if (!ObjectId.isValid(tableId)) {
            return NextResponse.json({ error: `Invalid id: ${tableId}` }, { status: 400 });
        }

        if (!ObjectId.isValid(projectId)) {
            return NextResponse.json({ error: `Invalid projectId: ${projectId}` }, { status: 400 });
        }

        const tableData = await getTableDataController(projectId, tableId);

        return NextResponse.json(tableData);
    } catch (error) {
        console.error('Error getting table data:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}