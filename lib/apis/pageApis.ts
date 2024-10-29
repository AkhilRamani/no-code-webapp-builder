export const createPageApi = async (name: string, projectId: string, isPrivate: boolean) => {
    try {
        const response = await fetch(`/api/projects/${projectId}/page`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, isPrivate })
        })

        const resData = await response.json()
        if (!response.ok) {
            throw new Error(`Failed to create page: ${resData.error || response.statusText}`);
        }

        return resData
    } catch (error) {
        console.error('Error creating page:', error)
        throw error
    }
}

export const getAllPagesApi = async (projectId: string) => {
    try {
        const response = await fetch(`/api/projects/${projectId}/page`)
        const resData = await response.json()
        return resData
    } catch (error) {
        console.error('Error getting pages:', error)
        throw error
    }
}

export const getPageSaveUrlApi = async (projectId: string, pageId: string): Promise<{ signedUrl: string }> => {
    try {
        const response = await fetch(`/api/projects/${projectId}/page/${pageId}/saveUrl`)
        const resData = await response.json()

        if (!response.ok) {
            throw new Error(`Failed to get page save url: ${resData.error || response.statusText}`);
        }

        return resData
    } catch (error) {
        console.error('Error getting page save url:', error)
        throw error
    }
}

export const getPageBinaryApi = async (projectId: string, pageId: string): Promise<string | undefined> => {
    try {
        const response = await fetch(`/api/projects/${projectId}/page/${pageId}/binary`)
        const resData = await response.json()

        if (response.status === 404) {
            return undefined
        }
        if (!response.ok) {
            throw new Error(`Failed to get page binary: ${resData.error || response.statusText}`);
        }

        return resData
    } catch (error) {
        console.error('Error getting page binary:', error)
        throw error
    }
}