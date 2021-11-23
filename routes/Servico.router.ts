import * as Express from 'express'
import ServicoController from '../controllers/Servico.controller'

const ServicoRouter = Express.Router()

// TODO : Change any typing to extended Express.Request
ServicoRouter.route('/').get((req : any, res : Express.Response) => {
    ServicoController.getAll(req, res)
})

export default ServicoRouter