import ObjetoBIMModel from '../models/ObjetoBIM.model'
import {Response} from 'express'

export default class ObjetoBIMController {
    
    // TODO : Change any typing to extended Express.Request
    // TODO : Improve query validation
    static getAll = (req : any, res : Response) : void => {
        ObjetoBIMModel.find({idbuilding : req.query.idbuilding})
            .then((bimArray) => {
                console.log(bimArray)
                res.status(200).json(bimArray)
            })
            .catch((err) => {
                res.status(500).json('Error: ' + err)
            })
    }
} 
