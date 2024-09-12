import { TableSchema } from "../store/useTableStore";
import { TableModal } from "@/types/db/table.types";

// trackingId is optional, used for tracking the request in the frontend to cache the store
export const createTableApi = async (
    projectId: string,
    tableName: string,
    fields: TableSchema['fields'],
    trackingId?: string
): Promise<{
    id: string;
    trackingId?: string;
}> => {
    try {
        const response = await fetch('/api/tables/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                projectId,
                name: tableName,
                fields,
                trackingId
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to create table: ${errorData.error || response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating table:', error);
        throw error;
    }
}

export const updateTablesApi = async (tables: Omit<TableModal, 'createdAt' | 'updatedAt' | 'projectId'>[]): Promise<void> => {
    try {
        const response = await fetch('/api/tables', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tables)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to update tables: ${errorData.error || response.statusText}`);
        }
    } catch (error) {
        console.error('Error updating tables:', error);
        throw error;
    }
}

export const deleteTablesApi = async (projectId: string, tableIds: string[]): Promise<void> => {
    try {
        const response = await fetch('/api/tables', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ projectId, tableIds })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to delete tables: ${errorData.error || response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting tables:', error);
        throw error;
    }
}