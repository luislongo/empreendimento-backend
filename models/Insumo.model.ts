import { model, Schema } from "mongoose";
import { CustoSchemaType } from "../types/Custo.type";
import Insumo from "../types/Insumo.type";

const InsumoSchema = new Schema<Insumo>(
    {
        idbuilding : {type: String, required:true},
        codigo : {type: String, required:true},
        tabela : {type: String, required:true},
        descricao : {type: String, required:true},
        unidade : {type: String, required:true},
        custoUn : {type: CustoSchemaType, required:true}
    }
)

const InsumoModel = model<Insumo>('Insumo', InsumoSchema, '_insumos')
export default InsumoModel