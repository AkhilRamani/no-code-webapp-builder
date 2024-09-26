import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { updateTablesController } from '@/lib/server/controllers/table/updateTables.controller';
import { deleteTablesController } from '@/lib/server/controllers/table/deleteTables.controller';
import { getTablesController } from '@/lib/server/controllers/table/getTables.controller';
import { authMiddleware, NextRequestAuthenticated } from '@/lib/auth/authMiddleware';
import { createTableController } from '@/lib/server/controllers/table/createTable.controller';

export const GET = authMiddleware(async (request: NextRequestAuthenticated, { params }: { params: { projectId: string } }) => {
    try {
        const { projectId } = params;

        if (!ObjectId.isValid(projectId)) {
            return NextResponse.json({ error: 'Invalid or missing projectId' }, { status: 400 });
        }

        const tables = await getTablesController(projectId);
        return NextResponse.json({ tables });

    } catch (error) {
        console.error('Error fetching tables:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
})

export const POST = authMiddleware(async (request: NextRequestAuthenticated, { params }: { params: { projectId: string } }) => {
    try {
        const userId = request.user.id;
        const { name, fields, trackingId } = await request.json();

        if (!ObjectId.isValid(params.projectId)) {
            return NextResponse.json({ error: `Invalid projectId` }, { status: 400 });
        }

        const res = await createTableController({ projectId: params.projectId, name, fields, userId })

        return NextResponse.json({ ...res, trackingId }, { status: 201 });
    } catch (error) {
        console.error("Error creating table:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
})

export const PATCH = authMiddleware(async (request: NextRequestAuthenticated) => {
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
})

export const DELETE = authMiddleware(async (request: NextRequest, { params }: { params: { projectId: string } }) => {
    try {
        const { projectId } = params;
        const { tableIds } = await request.json();

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
})