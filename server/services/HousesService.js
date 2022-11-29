import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js";
import { dbContext } from "../db/DbContext.js";

class HousesService {
    async getAll(query) {
        const houses = await dbContext.Houses.find(query)
        return houses
    }
    async getOne(id) {
        const foundHouse = await dbContext.Houses.findById(id)
        if (!foundHouse) throw new BadRequest('no house by that id')
        return foundHouse
    }
    async create(body) {
        const newHouse = await dbContext.Houses.create(body)
        return newHouse
    }
    async remove(id) {
        const house = await dbContext.Houses.findById(id)
        if (!house) throw new BadRequest('no house at that id')
        await house.remove()
        return `deleted house ${house.price}`
    }
    async update(id, body) {
        const currHouse = await dbContext.Houses.findById(id)
        if (!currHouse) throw new BadRequest('no house to edit')
        currHouse.bathrooms = body.bathrooms ? body.bathrooms : currHouse.bathrooms
        currHouse.bedrooms = body.bedrooms ? body.bedrooms : currHouse.bedrooms
        currHouse.description = body.description ? body.description : currHouse.description
        currHouse.imgUrl = body.imgUrl ? body.imgUrl : currHouse.imgUrl
        currHouse.levels = body.levels ? body.levels : currHouse.levels
        currHouse.price = body.price ? body.price : currHouse.price
        currHouse.year = body.year ? body.year : currHouse.year

        await currHouse.save()
        return currHouse
    }

}

export const housesService = new HousesService()

