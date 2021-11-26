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

    static executados = (req : any, res : Response) => {
        const endDate = new Date(req.query.endDate)

        ObjetoBIMModel.aggregate(
            [{$match: {
                'planejamento.fimExecucao' : {
                  $lte : endDate
                }
              }}, {$project: {
                idPlanejamento: 1,
              }}, {$lookup: {
                from: '_orcamentos',
                localField: 'idPlanejamento',
                foreignField: 'idPlanejamento',
                as: 'orcamentos'
              }}, {$unwind: {
                path: '$orcamentos',
                preserveNullAndEmptyArrays: false
              }}, {$project: {
                objetosBIM : '$orcamentos.objetosBIM'
              }}, {$unwind: {
                path: '$objetosBIM',
                preserveNullAndEmptyArrays: false
              }}, {$group: {
                _id: 'Objetos acumulados',
                objetosBIM: {
                  $push: '$objetosBIM'
                }
              }}]
        ).then((bimArray) => {
                res.status(200).json(bimArray)
            })
            .catch((err) => {
                res.status(500).json('Error: ' + err)
            })
    }
} 
