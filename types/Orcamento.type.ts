import Quantitativo from './Quantitativo.type'
import Custo from './Custo.type'
import Planejamento from './Planejamento.type'

export default interface Orcamento {
    idbuilding : string,
    descricao : string,
    quantitativoRef : string[]
    planejamento : Planejamento
    custoTotal : Custo
}