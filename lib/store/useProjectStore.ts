import { create } from "zustand";
import { createProjectApi, deleteProjectApi, getAllProjectsApi, getProjectApi, updateProjectApi } from "../apis/projectApis";
import { toast } from "sonner";
import { ProjectModal } from "@/types/db/project.types";

interface ProjectStore {
    projects: {
        name: string;
        id: string;
    }[];
    currentProject: ProjectModal | null;
    loading: boolean;
    getProjects: () => Promise<void>;
    createProject: (name: string) => Promise<string | undefined>;
    fetchProject: (id: string) => Promise<void>;
    updateProject: (id: string, data: Partial<Omit<ProjectModal, 'id' | 'createdAt' | 'updatedAt' | 'belongsTo'>>) => Promise<void>;
    deleteProject: (id: string) => Promise<void>;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
    projects: [],
    currentProject: null,
    loading: false,
    getProjects: async () => {
        set({ loading: true });
        try {
            const projects = await getAllProjectsApi();
            set({ projects, loading: false });
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch projects. Please try again.');
        }
    },
    createProject: async (name: string) => {
        try {
            const newProject = await createProjectApi(name);

            set({ projects: [...get().projects, newProject] });

            return newProject.id;
        } catch (error) {
            console.error(error);
            toast.error('Failed to create project. Please try again.');
        }
    },
    fetchProject: async (id: string) => {
        set({ loading: true });
        try {
            const project = await getProjectApi(id);
            set({ currentProject: project, loading: false });
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch project. Please try again.');
        }
    },
    updateProject: async (id, data) => {
        try {
            const updatedProject = await updateProjectApi(id, data);
            set(state => ({
                currentProject: updatedProject,
                projects: state.projects.map(project => project.id === id ? { ...project, name: updatedProject.name } : project)
            }));
        } catch (error) {
            console.error(error);
            toast.error('Failed to update project. Please try again.');
        }
    },
    deleteProject: async (id) => {
        try {
            await deleteProjectApi(id);
            set(state => ({
                projects: state.projects.filter(project => project.id !== id)
            }));
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete project. Please try again.');
        }
    }
}));