import * as Express from 'express'
import InsumoController from '../controllers/Insumo.controller'

const InsumoRouter = Express.Router()

// TODO : Change any typing to extended Express.Request
InsumoRouter.route('/').get((req : any, res : Express.Response) => {
    InsumoController.getAll(req, res)
})

export default InsumoRouter