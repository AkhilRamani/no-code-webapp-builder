export function getCollectionName(projectId: string, tableId: string): string {
    return `p_${projectId}_t_${tableId}`;
}