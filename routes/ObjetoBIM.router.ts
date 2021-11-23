import * as Express from 'express'
import ObjetoBIMController from '../controllers/ObjetoBIM.controller'

const ObjetoBIMRouter = Express.Router()

// TODO : Change any typing to extended Express.Request
ObjetoBIMRouter.route('/').get((req : any, res : Express.Response) => {
    ObjetoBIMController.getAll(req, res)
})

export default ObjetoBIMRouter