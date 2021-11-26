import * as Express from 'express'
import OrcamentoController from '../controllers/Orcamento.controller'

const OrcamentoRouter = Express.Router()

// TODO : Change any typing to extended Express.Request
OrcamentoRouter.route('/').get((req : any, res : Express.Response) => {
    OrcamentoController.getAll(req, res)
})

OrcamentoRouter.route('/desembolsoPrevisto').get((req : any, res : Express.Response) => {
    OrcamentoController.desembolsoPrevisto(req, res)
})

OrcamentoRouter.route('/desembolsoExecutado').get((req : any, res : Express.Response) => {
    OrcamentoController.desembolsoExecutado(req, res)
})

OrcamentoRouter.route('/totalPlanejado').get((req : any, res : Express.Response) => {
    OrcamentoController.totalPlanejado(req,res)
})

OrcamentoRouter.route('/totalExecutado').get((req : any, res : Express.Response) => {
    OrcamentoController.totalExecutado(req,res)
})

OrcamentoRouter.route('/comparativo').get((req : any, res : Express.Response) => {
    OrcamentoController.comparativo(req,res)
})

export default OrcamentoRouter