import * as Express from 'express'
import PlanejamentoController from '../controllers/Planejamento.controller'

const PlanejamentoRouter = Express.Router()

PlanejamentoRouter.route('/BIMexecutados').get((req : any, res : Express.Response) => {
    PlanejamentoController.BIMexecutados(req, res)
})

export default PlanejamentoRouter