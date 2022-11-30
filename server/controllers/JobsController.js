import { jobsService } from "../services/JobsService.js";
import BaseController from "../utils/BaseController.js";

export class JobsController extends BaseController {
    constructor() {
        super('api/jobs')
        this.router
            .get('', this.getAll)
            .get('/:id', this.getOne)
            .post('', this.create)
            .delete('/:id', this.remove)
            .put('/:id', this.update)

    }

    async getAll(req, res, next) {
        try {
            const query = req.query
            const jobs = await jobsService.getAll(query)
            return res.send(jobs)
        } catch (error) {
            next(error)
        }
    }

    async getOne(req, res, next) {
        try {
            const foundJob = await jobsService.getOne(req.params.id)
            return res.send(foundJob)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const job = await jobsService.create(req.body)
            return res.send(job)
        } catch (error) {
            next(error)
        }
    }

    async remove(req, res, next) {
        try {
            const message = await jobsService.remove(req.params.id)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const editedJob = await jobsService.update(req.params.id, req.body)
            return res.send(editedJob)
        } catch (error) {
            next(error)
        }
    }
}