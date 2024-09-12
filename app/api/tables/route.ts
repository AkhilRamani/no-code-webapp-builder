import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { updateTablesController } from '@/lib/server/controllers/table/updateTables.controller';
import { deleteTablesController } from '@/lib/server/controllers/table/deleteTables.controller';

export async function PATCH(request: NextRequest) {
    try {
        const updates = await request.json();

        if (!Array.isArray(updates) || updates.length === 0) {
            return NextResponse.json({ error: 'Invalid input: expected an array of table updates' }, { status: 400 });
        }

        for (const table of updates) {
            if (!table.id || !table.name || !table.fields) {
                console.log('table with missing fields', table);
                return NextResponse.json({ error: 'Missing required fields from id, name, fields' }, { status: 400 });
            }
            if (!ObjectId.isValid(table.id)) {
                return NextResponse.json({ error: `Invalid id: ${table.id}` }, { status: 400 });
            }
        }

        await updateTablesController(updates);

        return NextResponse.json({ message: 'Tables updated successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error updating tables:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { tableIds, projectId } = await request.json();

        if (!ObjectId.isValid(projectId)) {
            return NextResponse.json({ error: 'Invalid or missing projectId' }, { status: 400 });
        }

        if (!Array.isArray(tableIds) || tableIds.length === 0) {
            return NextResponse.json({ error: 'Invalid input: expected an array of tableIds' }, { status: 400 });
        }

        // Check if all tableIds are valid ObjectIds
        const invalidIds = tableIds.filter(id => !ObjectId.isValid(id));
        if (invalidIds.length > 0) {
            return NextResponse.json({
                error: 'Invalid tableIds',
                invalidIds: invalidIds
            }, { status: 400 });
        }

        await deleteTablesController(projectId, tableIds);

        return NextResponse.json({ message: 'Tables deleted successfully' });
    } catch (error) {
        console.error('Error deleting tables:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}