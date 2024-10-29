import { QueryMethods, SerializedNodes } from "@craftjs/core";
import { create } from "zustand";
import { wait } from "../utils";
import lz from "lzutf8";
import { getPageBinaryApi, getPageSaveUrlApi } from "../apis/pageApis";
import { useProjectStore } from "./useProjectStore";
import { usePageStore } from "./usePageStore";
import { toast } from "sonner";
import { uploadPageBinaryApi } from "../apis/pageBinaryApis";

interface PageBinaryStore {
    ingoreCount: number; // used to ingore initial invokes when page is loaded, assuming newly loaded page is uptodate
    pageBinary: string;
    fetchingBinary: boolean;
    saveUrl: string | undefined;
    saveFailed: boolean;
    saving: boolean;
    resetPageBinaryStore: () => void;
    saveSerializedNodes: (serializedNodes: string) => Promise<void>;
    handlePageChange: () => void;
    handleBinaryChange: (node: ReturnType<typeof QueryMethods>) => void;
    fetchSaveUrl: () => Promise<string>;
    fetchPageNodes: (projectId: string, pageId: string) => Promise<string | undefined>;
}

let saveTimer: NodeJS.Timeout | null;

export const usePageBinaryStore = create<PageBinaryStore>((set, get) => ({
    ingoreCount: 0,
    pageBinary: '',
    fetchingBinary: true,
    saveUrl: undefined,
    saveFailed: false,
    saving: false,
    resetPageBinaryStore: () => set({ ingoreCount: 0, pageBinary: '', saveFailed: false, saving: false, saveUrl: undefined, fetchingBinary: true }),
    handlePageChange: async () => {
        const { fetchSaveUrl } = get()

        try {
            set({ ingoreCount: 1 })
            await fetchSaveUrl();
        } catch (error) {
            toast.error('Error fetch save url : Page change')
            throw error
        }
    },
    handleBinaryChange: async (node) => {
        const { ingoreCount, saveSerializedNodes } = get()

        if (ingoreCount < 3) {
            set({ ingoreCount: ingoreCount + 1 })
            return
        }

        await wait(100)     //to avoid setting state at the same time page is rendered in react. Cant do both at the same time
        set({ saving: true })

        try {
            const pageData = node.serialize()

            if (saveTimer) {
                clearTimeout(saveTimer)
                saveTimer = null
            }
            saveTimer = setTimeout(async () => {
                await saveSerializedNodes(pageData)
            }, 5000)
        } catch (error) {
            console.error('Error saving page:', error)
            toast.error('Error saving page')
            throw error
        }
    },
    saveSerializedNodes: async (serializedNodes: string) => {
        if (!get().saving) return
        if (saveTimer) {
            console.log('clearing save timer for instant save')
            clearTimeout(saveTimer)
            saveTimer = null
        };

        try {
            const { saveUrl, fetchSaveUrl } = get()
            const url = saveUrl ?? await fetchSaveUrl();

            const pageBinary = lz.encodeBase64(lz.compress(serializedNodes))
            await uploadPageBinaryApi(url, pageBinary)

            set({ saving: false })
        } catch (error) {
            set({ saveFailed: true, saving: false })
        }
    },
    fetchSaveUrl: async (): Promise<string> => {
        try {
            const projectId = useProjectStore.getState().currentProject?.id
            const pageId = usePageStore.getState().currentPage?.id
            if (!projectId || !pageId) {
                throw new Error('Project or page not found')
            }

            const { signedUrl } = await getPageSaveUrlApi(projectId, pageId)
            set({ saveUrl: signedUrl })

            return signedUrl
        } catch (error) {
            console.error('Error getting page save url:', error)
            throw error
        }
    },
    fetchPageNodes: async (projectId: string, pageId: string): Promise<string | undefined> => {
        try {
            set({ fetchingBinary: true })

            const pageBinary = await getPageBinaryApi(projectId, pageId)
            if (!pageBinary) {
                return '{"ROOT":{"type":{"resolvedName":"UserCanvas"},"isCanvas":true,"props":{"classNames":{"direction":"flex-col"}},"displayName":"Canvas","custom":{},"hidden":false,"nodes":[],"linkedNodes":{}}}'
            }

            return lz.decompress(lz.decodeBase64(pageBinary));
        } catch (error) {
            console.error('Error getting page binary:', error)
            toast.error('Error getting page binary data')
            return undefined
        } finally {
            set({ fetchingBinary: false })
        }
    }
}))