import PlanejamentoModel from '../models/Orcamento.model'
import {Response} from 'express'

export default class PlanejamentoController {

    static BIMexecutados = (req : any, res : Response) => {
        const endDate = new Date(req.query.endDate)
        
        PlanejamentoModel.aggregate(
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
          }}])
          .then((json) => {
            res.status(200).json(json)
        })
        .catch((err) => {
            res.status(500).json('Error: ' + err)
        })
    }
}
