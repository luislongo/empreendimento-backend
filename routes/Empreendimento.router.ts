import * as Express from 'express'
import EmpreendimentoController from '../controllers/Empreendimento.controller'

const EmpreendimentoRouter = Express.Router()

// TODO : Change any typing to extended Express.Request
EmpreendimentoRouter.route('/').get((req : any, res : Express.Response) => {
    EmpreendimentoController.getAll(req, res)
})

export default EmpreendimentoRouter