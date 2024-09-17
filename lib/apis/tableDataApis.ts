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