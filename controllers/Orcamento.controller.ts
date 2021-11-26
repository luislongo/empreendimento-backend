import OrcamentoModel from '../models/Orcamento.model'
import {Response} from 'express'

export default class OrcamentoController {

    // TODO : Change any typing to extended Express.Request
    // TODO : Improve query validation
    static getAll = (req : any, res : Response) : void => {
        OrcamentoModel.find({idbuilding : req.query.idbuilding})
            .then((servicoArray) => {
                res.status(200).json(servicoArray)
            })
            .catch((err) => {
                res.status(500).json('Error: ' + err)
            })
    }

    // TODO : Filter by buildingId
    // TODO : This could be joined with this.desembolsoExecutado
    static desembolsoPrevisto = (req : any, res : Response) : void => {
        OrcamentoModel.aggregate([
            {$lookup: {
                from: '_planejamento',
                localField: 'idPlanejamento',
                foreignField: 'idPlanejamento',
                as: 'planejamento'}}, 
            {$unwind: {
                path: '$planejamento',
                preserveNullAndEmptyArrays: false}}, 
            {$project: {
                custoTotal : '$custoTotal.total',
                inicioPlanejado : '$planejamento.planejamento.inicioPlanejado'}}, 
            {$group: {
                _id: {
                    month : {$month : '$inicioPlanejado'},
                    year : {$year : '$inicioPlanejado'}
                },
            custoTotal : {$sum: '$custoTotal'}
            }}, 
            {$sort: {
                '_id.month': 1,
                '_id.year': 1,
        }}])
        .then((orcamentos) => {
            res.status(200).json(orcamentos)
        })
        .catch((err) => {
            res.status(500).json('Error: ' + err)
        })
    }

    static desembolsoExecutado = (req : any, res : Response) : void => {
        
        const endDate = new Date(req.query.endDate)
        
        OrcamentoModel.aggregate([{
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
            $project: {
                custoTotal: '$custoTotal.total',
                fimPlanejado: '$planejamento.planejamento.fimPlanejado'
            }
        }, {
            $match: {
                fimPlanejado: {
                    $lte: endDate
                }
            }
        }, {
            $group: {
                _id: 'Total',
                custoTotal: {
                    $sum: '$custoTotal'
                }
            }
        }])
        .then((json) => {
            res.status(200).json(json)
        }).catch((err) => {
            res.status(400).json(err)
        })
    }

    static totalPlanejado = (req : any, res : Response) => {
        const endDate = new Date(req.query.endDate)
        
        OrcamentoModel.aggregate(
            [{$lookup: {
                from: '_planejamento',
                localField: 'idPlanejamento',
                foreignField: 'idPlanejamento',
                as: 'planejamento'
              }}, {$unwind: {
                path: '$planejamento',
                preserveNullAndEmptyArrays: false
              }}, {$project: {
                custoTotal: '$custoTotal.total',
                fimPlanejado : '$planejamento.planejamento.fimPlanejado'
              }}, {$match: {
                fimPlanejado: {
                  $lte: endDate
                }
              }},{$group: {
                _id: 'Total',
                custoTotal: {
                  $sum: '$custoTotal'
                }
              }}])
          .then((json) => {
            res.status(200).json(json)
        }).catch((err) => {
            res.status(400).json(err)
        })

    }

    static totalExecutado = (req : any, res : Response) => {
        const endDate = new Date(req.query.endDate)

        OrcamentoModel.aggregate([{$lookup: {
            from: '_planejamento',
            localField: 'idPlanejamento',
            foreignField: 'idPlanejamento',
            as: 'planejamento'
          }}, {$unwind: {
            path: '$planejamento',
            preserveNullAndEmptyArrays: false
          }}, {$project: {
            custoTotal: '$custoTotal.total',
            fimExecucao: '$planejamento.planejamento.fimExecucao',
          }}, {$match: {
            fimExecucao : {$lte : endDate}
          }}, {$group: {
            _id: 'Total',
            custoTotal: {
              $sum : '$custoTotal'
            }
          }}])
          .then((json) => {
            res.status(200).json(json)
        }).catch((err) => {
            res.status(400).json(err)
        })

    }

    static comparativo = (req : any, res : Response) => {
        OrcamentoModel.aggregate(
        [{$lookup: {
            from: '_planejamento',
            localField: 'idPlanejamento',
            foreignField: 'idPlanejamento',
            as: 'planejamento'
          }}, {$unwind: {
            path: '$planejamento',
            preserveNullAndEmptyArrays: false
          }}, {$project: {
            custoTotal : 1,
            inicioPlanejado: '$planejamento.planejamento.inicioExecucao'
          }}, {$group: {
            _id: {
              month: {
                $month: '$inicioPlanejado'
              },
              year: {
                $year: '$inicioPlanejado'
              }
            },
            total : {
              $sum : '$custoTotal.total'
            },
            totalSemBDI : {
              $sum : '$custoTotal.totalSemBDI'
            },
            material : {
              $sum : '$custoTotal.material'
            },
            equipamento : {
              $sum : '$custoTotal.equipamento'
            },
            transporte : {
              $sum : '$custoTotal.transporte'
            },
            maoDeObra : {
              $sum : '$custoTotal.maoDeObra'
            },
            terceirizado : {
              $sum : '$custoTotal.tercerizado'
            },
            verba : {
              $sum : '$custoTotal.verba'
            },
            comissionamento : {
              $sum : '$custoTotal.comissionamento'
            },
            outro : {
              $sum : '$custoTotal.outro'
            },
          }}, {$sort: {
            '_id.month': 1,
            '_id.year': 1
          }}, {$project: {
            month: '$_id.month',
            year: '$_id.year',
            custoTotal : {
              total : '$total',
              totalSemBDI : '$totalSemBDI',
              material : '$material',
              equipamento : '$equipamento',
              transporte : '$transporte',
              maoDeObra : '$maoDeObra',
              terceirizado : '$terceirizado',
              comissionamento : '$comissionamento'
            }
          }}])
          .then((json) => {
            res.status(200).json(json)
        }).catch((err) => {
            res.status(400).json(err)
        })
    }
}
