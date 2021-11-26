import * as Express from 'express'
import InsumoController from '../controllers/Insumo.controller'

const InsumoRouter = Express.Router()

// TODO : Change any typing to extended Express.Request
InsumoRouter.route('/').get((req : any, res : Express.Response) => {
    InsumoController.getAll(req, res)
})

InsumoRouter.route('/maiscaros').get((req : any, res : Express.Response) => {
    InsumoController.maisCaros(req, res)
})

InsumoRouter.route('/periodo').get((req: any, res: Express.Response) => {
    InsumoController.periodo(req, res)
})

InsumoRouter.route('/objetosBIM').get((req:any, res: Express.Response) => {
    InsumoController.objetosBIM(req, res)
})

InsumoRouter.route('/porMes').get((req : any, res : Express.Response) => {
    InsumoController.insumosPorMes(req, res)
})

export default InsumoRouter