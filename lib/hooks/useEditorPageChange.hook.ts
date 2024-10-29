import { useEditor } from "@craftjs/core"
import { usePageBinaryStore } from "../store/usePageBinaryStore"
import { usePageStore } from "../store/usePageStore"

export const useEditorPageChange = () => {
    const { handlePageChange, saveSerializedNodes } = usePageBinaryStore(({ handlePageChange, saveSerializedNodes }) => ({ handlePageChange, saveSerializedNodes }))
    const setCurrentPage = usePageStore(state => state.setCurrentPage)
    const { query } = useEditor()

    const savePrevAndChange = async (nextPageId: string) => {
        const serializedJson = query.serialize();
        await saveSerializedNodes(serializedJson)

        setCurrentPage(nextPageId)
        handlePageChange()
    }

    return { savePrevAndChange }
}