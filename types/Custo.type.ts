const CustoSchemaType = {
    total : {type: Number, required:true},
    totalSemBDI : {type: Number, required:true},
    material : {type: Number, required:true},
    equipamento : {type: Number, required:true},
    transporte : {type: Number, required:true},
    maoDeObra : {type: Number, required:true},
    terceirizado : {type: Number, required:true},
    verba : {type: Number, required:true},
    comissionamento : {type: Number, required:true},
    outros : {type: Number, required:true}
}

export default interface Custo {
    total : number,
    totalSemBDI : number,
    material : number,
    equipamento :  number,
    transporte : number,
    maoDeObra : number,
    terceirizado : number,
    verba : number,
    comissionamento : number,
    outros : number
}

export {CustoSchemaType}