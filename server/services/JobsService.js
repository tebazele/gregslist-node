import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js";
import { dbContext } from "../db/DbContext.js";

class JobsService {
    async getAll(query) {
        const jobs = dbContext.Jobs.find(query)
        return jobs
    }
    async getOne(id) {
        const foundJob = dbContext.Jobs.findById(id)
        if (!foundJob) throw new BadRequest('no job by that id')
        return foundJob
    }
    async create(body) {
        const newJob = dbContext.Jobs.create(body)
        return newJob
    }
    async remove(id) {
        const deletedJob = await dbContext.Jobs.findById(id)
        if (!deletedJob) throw new BadRequest('no job by that id')
        await deletedJob.remove()
        return `deleted job ${deletedJob.jobTitle}`
    }
    async update(id, body) {
        const currJob = await dbContext.Jobs.findById(id)
        if (!currJob) throw new BadRequest('no job at the id')
        const updatedJob = currJob.update(body)
        return updatedJob

    }

}

export const jobsService = new JobsService()