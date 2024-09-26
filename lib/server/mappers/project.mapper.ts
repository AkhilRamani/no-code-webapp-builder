import { ProjectModal, ProjectRecord } from "@/types/db/project.types"

export class ProjectMapper {
    static RecordToProjectModal(record: ProjectRecord): Omit<ProjectModal, 'belongsTo'> {
        return {
            id: record._id.toString(),
            name: record.name,
            // belongsTo: record.belongsTo.toString(),
            createdAt: record.createdAt,
            updatedAt: record.updatedAt
        }
    }
}