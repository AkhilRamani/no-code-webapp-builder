export const getTableDataApi = async (projectId: string, tableId: string) => {
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

export const addTableDataRowApi = async (projectId: string, tableId: string, data: Record<string, any>) => {
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
