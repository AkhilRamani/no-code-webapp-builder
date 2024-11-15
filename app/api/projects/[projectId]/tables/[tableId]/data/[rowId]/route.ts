import { editTableDataRowController } from "@/lib/server/controllers/table/data/editTableDataRow.controller";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (request: NextRequest, { params }: { params: { tableId: string, projectId: string, rowId: string } }) => {
    try {
        const { tableId, projectId, rowId } = params;

        const data = await request.json();

        if (!ObjectId.isValid(tableId)) {
            return NextResponse.json({ error: `Invalid id: ${tableId}` }, { status: 400 });
        }
        if (!ObjectId.isValid(projectId)) {
            return NextResponse.json({ error: `Invalid projectId: ${projectId}` }, { status: 400 });
        }
        if (!ObjectId.isValid(rowId)) {
            return NextResponse.json({ error: `Invalid rowId: ${rowId}` }, { status: 400 });
        }

        await editTableDataRowController(projectId, tableId, rowId, data);

        return NextResponse.json({ message: 'success' });
    } catch (error) {
        console.error('Error editing table data row:', error);
        if (error instanceof Error && 'code' in error) {
            const statusCode = (error as { code: number }).code
            return NextResponse.json({ error: error.message }, { status: statusCode })
        } else {
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
    }
}