import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"

class CarsService {
    async getAll(query) {

        // find takes in the query (?model=Protege in url)
        // your can sort by any of mongoose's formatting magic
        // limit the number that come back
        const cars = await dbContext.Cars.find(query).sort('-createdAt').limit(4)
        // handle paginated results
        // can use { model: "Protege" } instead of query as an endpoint

        // if you pass nothing into find, that says find everything (unique to Mongoose)
        return cars
    }
    async getOne(id) {
        const car = await dbContext.Cars.findById(id)
        if (!car) throw new BadRequest('no car with id ' + id)
        return car
    }
    async create(carData) {
        try {
            const newCar = await dbContext.Cars.create(carData)
            return newCar
        } catch (error) {
            return error
        }
    }
    async remove(id) {
        const car = await dbContext.Cars.findById(id)
        if (!car) throw new BadRequest('no car at id: ' + id)
        await car.remove()
        return `deleted ${car.make} ${car.model}`
    }

    async update(id, body) {
        // findbyidandupdate -- can edit all fields
        // doublecheck if we are sending in a good id

        // don't want to pass in entire object, just the stuff you're updating
        const original = await dbContext.Cars.findById(id)
        if (!original) throw new BadRequest('nope')

        // NOTE make these uneditable by not including them or making them equal only to the original 
        original.make = body.make ? body.make : original.make
        original.model = body.model ? body.model : original.model
        // allows user to put 0 or another falsy value (and save it)
        original.price = body.price !== undefined ? body.price : original.price
        original.imgUrl = body.imgUrl ? body.imgUrl : original.imgUrl
        original.year = body.year ? body.year : original.year
        original.description = body.description ? body.description : original.description
        original.color = body.color ? body.color : original.color
        // etc.
        await original.save()
        return original
    }

}

export const carsService = new CarsService()