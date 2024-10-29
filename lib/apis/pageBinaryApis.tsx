export const uploadPageBinaryApi = async (uploadUrl: string, pageBinary: string) => {
    console.log('Saving to S3', uploadUrl)

    try {
        const response = await fetch(uploadUrl, {
            method: 'PUT',
            body: pageBinary,
            headers: {
                'Content-Type': 'text/plain',
                'Content-Encoding': 'base64',
            },
        })

        console.log('response', response)

        if (!response.ok) {
            throw new Error('Failed to upload page binary')
        }

        return { error: false }
    } catch (error) {
        console.error('Error uploading page binary:', error)
        return { error: true }
    }
}