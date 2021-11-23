export const PlanejamentoSchemaType = {
    inicioPrevisto : {type : Date, required : true},
    fimPrevisto :  {type : Date, required : true},
    inicioExecutado : {type : Date, required : true},
    fimExecutado: {type : Date, required : true},
}

export default interface Planejamento {
    inicioPrevisto : Date,
    fimPrevisto : Date,
    inicioExecutado : Date,
    fimExecutado: Date,
}