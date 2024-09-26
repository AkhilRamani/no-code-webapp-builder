import { ObjectId } from "mongodb";
import { getAppDbCollection } from "../appDb/mongodb";
import { ProjectModal, ProjectRecord } from "@/types/db/project.types";
import { ProjectMapper } from "../mappers/project.mapper";

export class ProjectRepository {
    static async create(userId: string, name: string) {
        const projectsCollection = await getAppDbCollection("projects")

        const { insertedId } = await projectsCollection.insertOne({
            name,
            createdAt: new Date(),
            belongsTo: userId
        })

        return insertedId.toString()
    }

    static async getById(id: string) {
        const projectsCollection = await getAppDbCollection("projects")

        const project = await projectsCollection.findOne<ProjectRecord>({ _id: new ObjectId(id) })

        return project ? ProjectMapper.RecordToProjectModal(project) : null
    }

    static async getAllByUserId(userId: string) {
        const projectsCollection = await getAppDbCollection("projects")

        const projects = await projectsCollection.find<ProjectRecord>({ belongsTo: userId }).toArray()

        return projects.map(ProjectMapper.RecordToProjectModal)
    }

    static async delete(id: string) {
        const projectsCollection = await getAppDbCollection("projects")
        await projectsCollection.deleteOne({ _id: new ObjectId(id) })
    }

    static async update(id: string, projectData: Partial<Omit<ProjectModal, 'id' | 'createdAt' | 'updatedAt'>>) {
        const projectsCollection = await getAppDbCollection("projects")
        const updatedProject = await projectsCollection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { ...projectData, updatedAt: new Date() } }, { returnDocument: 'after' });

        return updatedProject ? ProjectMapper.RecordToProjectModal(updatedProject as ProjectRecord) : null;
    }
}