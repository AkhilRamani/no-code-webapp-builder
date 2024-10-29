import { create } from "zustand";
import { createPageApi, getAllPagesApi } from "../apis/pageApis";
import { PageModal } from "@/types/db/page.types";

type Page = Omit<PageModal, 'createdAt' | 'updatedAt' | 'projectId'>

interface PageStore {
    pages: Page[];
    currentPage: Page | undefined;
    loading: boolean;
    showList: boolean;
    fetchPages: (projectId: string) => Promise<void>;
    createPage: (name: string, projectId: string, isPrivate: boolean) => Promise<void>;
    setCurrentPage: (pageId: string) => void;
    toggleShowList: () => void;
    resetPageStore: () => void;
}

export const usePageStore = create<PageStore>((set, get) => ({
    pages: [],
    currentPage: undefined,
    loading: false,
    showList: false,
    fetchPages: async (projectId: string) => {
        set({ loading: true })
        try {
            const pages = await getAllPagesApi(projectId)
            set({ pages, currentPage: pages[0] })
        }
        catch (error) {
            console.error('Error getting pages:', error)
            throw error
        }
        finally {
            set({ loading: false })
        }
    },
    createPage: async (name: string, projectId: string, isPrivate: boolean) => {
        try {
            const newPage = await createPageApi(name, projectId, isPrivate)
            console.log('newPage', newPage)
            set(state => ({ pages: [...state.pages, newPage], currentPage: newPage }))
        } catch (error) {
            console.error('Error creating page:', error)
            throw error
        }
    },
    setCurrentPage: (pageId: string) => set({ currentPage: get().pages.find(page => page.id === pageId) }),
    toggleShowList: () => set(store => ({ showList: !store.showList })),
    resetPageStore: () => set({ pages: [], currentPage: undefined, loading: false, showList: false }),
}));