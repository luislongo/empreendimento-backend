import ServicoModel from '../models/Servico.model'
import {Response} from 'express'

export default class ServicoController {

    // TODO : Change any typing to extended Express.Request
    // TODO : Improve query validation
    static getAll = (req : any, res : Response) : void => {
        ServicoModel.find({idbuilding : req.query.idbuilding})
            .then((servicoArray) => {
                res.status(200).json(servicoArray)
            })
            .catch((err) => {
                res.status(500).json('Error: ' + err)
            })
    }
} 
