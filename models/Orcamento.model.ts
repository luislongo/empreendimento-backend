import { model, Schema } from "mongoose";
import { CustoSchemaType } from "../types/Custo.type";
import { PlanejamentoSchemaType } from "../types/Planejamento.type";
import Orcamento from "../types/Orcamento.type";

const OrcamentoSchema = new Schema<Orcamento>(
    {
        idbuilding : {type: String, required:true},
        descricao : {type: String, required:true},
        quantitativoRef : {type: [String], required:true},
        planejamento : PlanejamentoSchemaType,
        custoTotal : CustoSchemaType
    }
)

const OrcamentoModel = model<Orcamento>('Orcamento', OrcamentoSchema, '_orcamentos')
export default OrcamentoModel