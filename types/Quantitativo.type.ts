export default interface Quantitativo {
    idbuilding : string
    descricao : string
    unidade : string
    quantidade : number
    insumos : {
        refId : string,
        quantidade : number
    }[]
}