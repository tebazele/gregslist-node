import { carsService } from "../services/CarsService.js"
import BaseController from "../utils/BaseController.js"

export class CarsController extends BaseController {
    constructor() {
        super('api/cars')
        this.router
            .get('', this.getAll)
            .get('/:id', this.getOne)
            .post('', this.create)
            .delete('/:id', this.remove)
            .put('/:id', this.update)
    }

    async getAll(request, response, next) {
        try {
            // enable use of query params, add query as parameter for getAll in services and find
            const query = request.query

            const cars = await carsService.getAll(query)
            return response.send(cars)
        } catch (error) {
            next(error)
        }
    }

    async getOne(req, res, next) {
        try {
            const car = await carsService.getOne(req.params.id)
            return res.send(car)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const car = await carsService.create(req.body)
            return res.send(car)
        } catch (error) {
            next(error)
        }
    }

    async remove(req, res, next) {
        try {
            const message = await carsService.remove(req.params.id)
            return message
        } catch (error) {
            next(error)
        }
    }

    // update is a post and delete in one (give me the one you want to delete, then the body you want to post)
    async update(req, res, next) {
        try {
            const carUpdate = await carsService.update(req.params.id, req.body)
            return res.send(carUpdate)
        } catch (error) {
            next(error)
        }
    }
}