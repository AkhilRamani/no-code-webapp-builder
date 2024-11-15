import { TableDataRow } from "../store/useTableDataStore";

export const getTableDataApi = async (projectId: string, tableId: string): Promise<TableDataRow[]> => {
    try {
        const response = await fetch(`/api/projects/${projectId}/tables/${tableId}/data`);

        const data = await response.json();
        if (!response.ok) {
            const errorData = data;
            throw new Error(`Failed to get table data: ${errorData.error || response.statusText}`);
        }

        return data;
    } catch (error) {
        console.error('Error getting table data:', error);
        throw error;
    }
}

export const addTableDataRowApi = async (projectId: string, tableId: string, data: Record<string, any>): Promise<{ id: string }> => {
    try {
        const response = await fetch(`/api/projects/${projectId}/tables/${tableId}/data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseBody = await response.json();
        if (!response.ok) {
            const errorData = responseBody;
            throw new Error(`Failed to add table data row: ${errorData.error || response.statusText}`);
        }

        return responseBody;
    } catch (error) {
        console.error('Error adding table data row:', error);
        throw error;
    }
}

export const deleteTableRowsApi = async (projectId: string, tableId: string, rowIds: string[]) => {
    try {
        const response = await fetch(`/api/projects/${projectId}/tables/${tableId}/data`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids: rowIds })
        });

        const responseBody = await response.json();
        if (!response.ok) {
            const errorData = responseBody;
            throw new Error(`Failed to delete table data rows: ${errorData.error || response.statusText}`);
        }

        return responseBody;
    } catch (error) {
        console.error('Error deleting table data rows:', error);
        throw error;
    }
}

export const editTableDataRowApi = async (projectId: string, tableId: string, rowId: string, data: Record<string, any>): Promise<void> => {
    try {
        const response = await fetch(`/api/projects/${projectId}/tables/${tableId}/data/${rowId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseBody = await response.json();
        if (!response.ok) {
            const errorData = responseBody;
            throw new Error(`Failed to edit table data row: ${errorData.error || response.statusText}`);
        }

        return responseBody;
    } catch (error) {
        console.error('Error editing table data row:', error);
        throw error;
    }
}