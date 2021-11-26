import InsumoModel from '../models/Insumo.model'
import {Response} from 'express'

export default class InsumoController {
    
    // TODO : Change any typing to extended Express.Request
    // TODO : Improve query validation
    static getAll = (req : any, res : Response) : void => {
        InsumoModel.find({idbuilding : req.query.idbuilding})
            .then((inputArray) => {
                res.status(200).json(inputArray)
            })
            .catch((err) => {
                res.status(500).json('Error: ' + err)
            })
    }

    // TODO : Filter by idbuilding
    static maisCaros = (req : any, res : Response) : void => {
        InsumoModel.aggregate([
            {$group: {
                _id: '$descricao',
                total : {$sum : '$custoTotal.total'},
                totalSemBDI : {$sum : '$custoTotal.totalSemBDI'},
                material : {$sum : '$custoTotal.material'},
                equipamento : {$sum : '$custoTotal.equipamento'},
                transporte : {$sum : '$custoTotal.transporte'},
                maoDeObra : {$sum : '$custoTotal.maoDeObra'},
                terceirizado : {$sum : '$custoTotal.tercerizado'},
                verba : {$sum : '$custoTotal.verba'},
                comissionamento : {$sum : '$custoTotal.comissionamento'},
                outro : {$sum : '$custoTotal.outro'},
            }}, 
            {$sort: {total: -1}}]).
            then((insumos) => {
              res.status(200).json(insumos)
          }).catch((err) => {
              console.log(err)
          })
    }

    // TODO : Structure output better
    static periodo = (req : any, res: Response) : void => {
        const startDate = new Date(req.query.startDate)
        const endDate = new Date(req.query.endDate)
        const idbuilding = req.query.idbuilding
        const descricaoInsumo = req.query.descricaoInsumo

        InsumoModel.aggregate([
            {$match: {descricao: descricaoInsumo
            }}, 
            {$project: {
                idPlanejamento: 1,
                descricao: 1,
                quantidade: 1,
                custoTotal: '$custoTotal.total'
            }}, 
            {$lookup: {
                from: '_planejamento',
                localField: 'idPlanejamento',
                foreignField: 'idPlanejamento',
                as: 'planejamento'
            }}, 
            {$unwind: {
                path: '$planejamento',
                preserveNullAndEmptyArrays: false
            }}, 
            {$match: {
                'planejamento.planejamento.inicioPlanejado': {
                    $gte: startDate,
                    $lte: endDate
            }}}, 
            {$group: {
                _id: '$descricao',
                quantidade: {$sum: '$quantidade'},
                custoTotal: {$sum: '$custoTotal'
            }}}])
        .then((insumo) => {
            res.status(200).json(insumo)
        }).catch((err) => {
            res.status(400).json(err)
        })
    }

    static objetosBIM = (req : any, res : Response) => {
        const descricaoInsumo = req.query.descricaoInsumo

        InsumoModel.aggregate([
        {$match : {descricao : descricaoInsumo}},
        {$project: {
            descricao: 1,
            objetosBIM: 1
        }}, 
        {
            $unwind: {
                path: '$objetosBIM',
                preserveNullAndEmptyArrays: false
            }
        }, {
            $group: {
                _id: '$descricao',
                objetosBIM: {
                    $push: '$objetosBIM'
                }
            }
        }])
        .then((objetosBIM) => {
            res.status(200).json(objetosBIM)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
    }

    // TODO : This could be joined with this.periodo
    static insumosPorMes = (req : any, res : Response) => {
        const descricaoInsumo = req.query.descricaoInsumo

        InsumoModel.aggregate(
        [{
            $match: {
                descricao: descricaoInsumo
            }
        }, {
            $project: {
                idPlanejamento: 1,
                quantidade: 1,
                descricao: 1,
                custo: '$custoTotal.total'
            }
        }, {
            $lookup: {
                from: '_planejamento',
                localField: 'idPlanejamento',
                foreignField: 'idPlanejamento',
                as: 'planejamento'
            }
        }, {
            $unwind: {
                path: '$planejamento',
                preserveNullAndEmptyArrays: false
            }
        }, {
            $group: {
                _id: {
                    month: {$month: '$planejamento.planejamento.inicioPlanejado'},
                    year: {$year: '$planejamento.planejamento.inicioPlanejado'}
                },
                quantidade: {$sum: '$quantidade'},
                custo: {$sum: '$custo'},
                descricao: {$first: '$descricao'}
            }
        }, {
            $sort: {
                '_id.month': 1,
                '_id.year': 1,
            }
        }, {
            $project: {
                month: '$_id.month',
                year: '$_id.year',
                custo: 1,
                descricao: 1,
                quantidade: 1
            }
        }])
        .then((objetosBIM) => {
            res.status(200).json(objetosBIM)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
    }
} 
