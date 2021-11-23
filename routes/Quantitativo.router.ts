import * as Express from 'express'
import Quantitativo from '../controllers/Quantitativo.controller'

const QuantitativoRouter = Express.Router()

// TODO : Change any typing to extended Express.Request
QuantitativoRouter.route('/').get((req : any, res : Express.Response) => {
    Quantitativo.getAll(req, res)
})

export default QuantitativoRouter