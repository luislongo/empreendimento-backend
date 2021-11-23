import EmpreendimentoModel from '../models/Empreendimento.model'
import {Response} from 'express'

export default class EmpreendimentoController {
    
    // TODO : Change any typing to extended Express.Request
    // TODO : Improve query validation
    static getAll = (req : any, res : Response) : void => {
        EmpreendimentoModel.find({idbuilding : req.query.idbuilding})
            .then((inputArray) => {
                console.log(inputArray)
                res.status(200).json(inputArray)
            })
            .catch((err) => {
                res.status(500).json('Error: ' + err)
            })
    }
} 
